import type { LoadContext, Plugin } from "@docusaurus/types";
import { mkdirSync, writeFileSync } from "node:fs";
import axios from "axios";
import { DecentralizedDocsPluginOptions, GitHubContent } from "./types";

export default async function pluginDecentralizedDocumentation(
    _: LoadContext,
    options: DecentralizedDocsPluginOptions,
): Promise<Plugin<void>> {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.github.com/repos/${options.sourceBaseUrl}/contents`,
        headers: { 
          "Accept": "application/vnd.github.v3+json", 
          "Authorization": "Bearer " + options.token,
          "User-Agent": "PostmanRuntime/7.32.3",
        }
    };

    let contents: GitHubContent[] = (await axios.request(config)).data;

    mkdirSync(`docs/${options.outDir}`, {recursive: true});
    for (const content of contents) {
        if (content.download_url !== null) {
            let markdownContent = (await axios.get(content.download_url)).data;
            writeFileSync(`docs/${options.outDir}/${content.name}`, markdownContent);
            console.log(content.name+" downloaded.");
        }
    }
    return {
        name: 'docusaurus-decentralized-documentation'
    };
}