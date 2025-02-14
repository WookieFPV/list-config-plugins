import "@total-typescript/ts-reset";

declare namespace NodeJS {
    interface ProcessEnv {
        COMP_LINE: string | undefined;
    }
}
