import { BundledHighlighterOptions, BundledLanguage, BundledTheme, CodeToHastOptions, codeToHtml, createHighlighter, ResolveBundleKey, ShikiTransformer } from 'shiki';
import { Lang } from 'shiki-languages';
import { Parent } from 'unist';
import { EXIT, visit } from 'unist-util-visit';


export type RemarkShikiOptions = {
	highlighterOptions: BundledHighlighterOptions<BundledLanguage, BundledTheme>,
	inferLang?: ((snippet: string) => Promise<Lang | undefined>) | string,
	codeToHtmlOptions: CodeToHastOptions<ResolveBundleKey<Lang>, ResolveBundleKey<BundledTheme>>
}

export interface RemarkNode extends Parent {
	type: string;
	value: string;
	lang?: Lang;
}

export default async function remarkShiki({ markdownAST }: any, options: RemarkShikiOptions) {
	await recursivelyFindAndHighlightNextCodeNode(markdownAST, options)
	return markdownAST
}

async function recursivelyFindAndHighlightNextCodeNode(markdownAST: any, options: RemarkShikiOptions) {
	const node = findNextCodeNodeFromMarkdownAST(markdownAST)

	if (node) {
		await highlightCodeNode(node, options)
		await recursivelyFindAndHighlightNextCodeNode(markdownAST, options)
	}
}

async function highlightCodeNode(node: RemarkNode, options: RemarkShikiOptions) {
	node.type = `html`
	node.children = []
	node.value = await getNodeHighlightedHtml({ codeSnippet: node.value, explicitLang: node.lang }, options)
}

export type CodeSnippetNodeData = {
	explicitLang?: string
	codeSnippet: string
}

async function getNodeHighlightedHtml({ explicitLang, codeSnippet }: CodeSnippetNodeData, options: RemarkShikiOptions): Promise<string> {
	const { highlighterOptions, codeToHtmlOptions, inferLang } = options

	const highlighter = highlighterOptions ? await createHighlighter(highlighterOptions) : undefined;

	const inferredLang = await (async () => {
		if (explicitLang) {
			return undefined
		}

		if (typeof inferLang === `function`) {
			return await inferLang(codeSnippet)
		}

		if (typeof inferLang === `string`) {
			return inferLang as Lang
		}

		return undefined
	})()

	const lang = explicitLang ?? inferredLang

	if (!lang) {
		return `<pre class="shiki-unknown"><code>${codeSnippet}</code></pre>`;
	}

	const internalTransformers = inferredLang ? [addInferredLangFlagToShikiPreElement] : []
	const userTransformers = codeToHtmlOptions.transformers ?? []

	const transformers = [...userTransformers, ...internalTransformers]

	const effectiveCodeToHtmlOptions: typeof codeToHtmlOptions = {
		...codeToHtmlOptions,
		lang: lang,
		transformers: transformers,
	}

	if (highlighter) {
		return highlighter.codeToHtml(codeSnippet, effectiveCodeToHtmlOptions);
	}

	return await codeToHtml(codeSnippet, effectiveCodeToHtmlOptions);
}

function findNextCodeNodeFromMarkdownAST(markdownAST: any): RemarkNode | undefined {
	let result: RemarkNode | undefined = undefined
	visit(markdownAST, `code`, (node: RemarkNode) => {
		result = node
		return [EXIT]
	});
	return result
}

const addInferredLangFlagToShikiPreElement: ShikiTransformer = {
	pre: function (node) {
		this.addClassToHast(node, `shiki-lang-was-inferred`)
		node.properties[`data-shiki-lang-was-inferred`] = `1`
	},
}