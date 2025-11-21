import { BundledHighlighterOptions, BundledLanguage, BundledTheme, CodeToHastOptions, codeToHtml, createHighlighter, HighlighterGeneric, ResolveBundleKey, ShikiTransformer, StringLiteralUnion, ThemeRegistrationAny } from 'shiki';
import { Lang } from 'shiki-languages';
import { Node, Parent } from 'unist';
import { EXIT, visit } from 'unist-util-visit';


export type RemarkShikiOptions = {
	highlighterOptions: BundledHighlighterOptions<BundledLanguage, BundledTheme>,
	inferLang?: ((snippet: string) => Promise<Lang | undefined>) | string,
	codeToHtmlOptions: CodeToHastOptions<ResolveBundleKey<Lang>, ResolveBundleKey<BundledTheme>>
}

export type ThemeRegistration = ThemeRegistrationAny | StringLiteralUnion<BundledTheme>

export interface RemarkNode extends Node, Parent {
	type: string;
	value: string;
	lang?: Lang;
}
export type ShikiHighlighter = HighlighterGeneric<BundledLanguage, BundledTheme>
export default async function (
	{ markdownAST }: any,
	options: RemarkShikiOptions
) {
	let highlighter: ShikiHighlighter | undefined = undefined;
	const inferLang = options.inferLang

	if (options.highlighterOptions) {
		highlighter = await createHighlighter(options.highlighterOptions);
	}

	let highlightCode: (() => Promise<void>) | null = null

	async function findNextHighlightSnippetTask() {
		visit(markdownAST, 'code', (node: RemarkNode) => {
			highlightCode = async function () {
				node.type = 'html';
				node.children = [];

				let lang = node.lang
				let inferredLang: Lang | undefined

				let wasInferred: boolean = false

				if (!lang) {
					inferredLang = await (async () => {
						if (typeof inferLang === "function") {
							return await inferLang(node.value)
						}

						if (typeof inferLang === "string") {
							return inferLang as Lang
						}

						return undefined
					})()

					if (inferredLang) {
						lang = inferredLang
						wasInferred = true
					} else {
						node.value = `<pre class="shiki-unknown"><code>${node.value}</code></pre>`;
						return
					}
				}

				const transformers: ShikiTransformer[] = [...(options.codeToHtmlOptions.transformers || [])]

				if (wasInferred) {
					transformers.push({
						pre(node) {
							this.addClassToHast(node, "shiki-lang-was-inferred")
							node.properties["shiki-lang-was-inferred"] = "1"
						},
					})
				}

				if (highlighter) {
					node.value = highlighter?.codeToHtml!(node.value, {
						...options.codeToHtmlOptions,
						lang: lang as Lang,
						transformers: transformers,
					});
				} else {
					node.value = await codeToHtml!(node.value, {
						...options.codeToHtmlOptions,
						lang: lang as Lang,
						transformers: transformers,
					});
				}
			}

			return [EXIT]
		});

		if (highlightCode) {
			await highlightCode()
			highlightCode = null
			await findNextHighlightSnippetTask()
		}
	}

	await findNextHighlightSnippetTask()

	return markdownAST;
}
