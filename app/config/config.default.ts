import { Application } from "../lib/Application";
type UrlPath = string;
type PathStr = string
interface ApplicationConfig {
    static?: {
        prefix?: UrlPath,
        dir?: PathStr,
    }
}

export default (app: Application): ApplicationConfig => {
  const config: ApplicationConfig = {}

  
  return <ApplicationConfig> {
    ...config,
  }
}