declare type UrlPath = string;
declare type PathStr = string;
declare interface ApplicationCfDec {
    static?: {
        prefix?: UrlPath;
        dir?: PathStr;
    };
}

