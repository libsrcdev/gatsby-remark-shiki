import { BundledHighlighterOptions, BundledLanguage, BundledTheme, CodeToHastOptions, ResolveBundleKey, ThemeRegistrationAny, StringLiteralUnion, HighlighterGeneric } from 'shiki';
import { Lang } from 'shiki-languages';
import { Node, Parent } from 'unist';

type RemarkShikiOptions = {
    highlighterOptions: BundledHighlighterOptions<BundledLanguage, BundledTheme>;
    inferLang?: ((snippet: string) => Promise<Lang | undefined>) | string;
    codeToHtmlOptions: CodeToHastOptions<ResolveBundleKey<Lang>, ResolveBundleKey<BundledTheme>>;
};
type ThemeRegistration = ThemeRegistrationAny | StringLiteralUnion<BundledTheme>;
interface RemarkNode extends Node, Parent {
    type: string;
    value: string;
    lang?: Lang;
}
type ShikiHighlighter = HighlighterGeneric<BundledLanguage, BundledTheme>;
declare function export_default({ markdownAST }: any, options: RemarkShikiOptions): Promise<any>;

export { type RemarkNode, type RemarkShikiOptions, type ShikiHighlighter, type ThemeRegistration, export_default as default };
