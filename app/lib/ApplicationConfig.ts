import path from 'path';

interface IniApplicationConfig {
    static: {
        prefix: string;
        dir: string;
    };
}

export default <IniApplicationConfig> {
    static: {
      prefix: '/app/public',
      dir: path.resolve(),
    }
}
