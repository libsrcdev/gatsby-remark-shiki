import { BundledHighlighterOptions, BundledLanguage, BundledTheme, CodeToHastOptions, ResolveBundleKey } from 'shiki';
import { Lang } from 'shiki-languages';
import { Parent } from 'unist';

type RemarkShikiOptions = {
    highlighterOptions: BundledHighlighterOptions<BundledLanguage, BundledTheme>;
    inferLang?: ((snippet: string) => Promise<Lang | undefined>) | string;
    codeToHtmlOptions: CodeToHastOptions<ResolveBundleKey<Lang>, ResolveBundleKey<BundledTheme>>;
};
interface RemarkNode extends Parent {
    type: string;
    value: string;
    lang?: Lang;
}
declare function remarkShiki({ markdownAST }: any, options: RemarkShikiOptions): Promise<any>;
type CodeSnippetNodeData = {
    explicitLang?: string;
    codeSnippet: string;
};

export { type CodeSnippetNodeData, type RemarkNode, type RemarkShikiOptions, remarkShiki as default };
