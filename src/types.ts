// import { AxiosRequestConfig } from "axios";

export interface DecentralizedDocsPluginOptions {
    sourceBaseUrl: string
    outDir: string
    token: string
}

export interface GitHubContent {
    name: string
    path: string
    sha: string
    size: number
    url: string
    html_url: string
    git_url: string
    download_url: string | null
    type: string
    _links: {
        self: string
        git: string
        html: string
    }
}
