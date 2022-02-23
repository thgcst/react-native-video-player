import { css } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    metrics: {
      headerPadding: number;
      basePadding: number;
      baseMargin: number;
      screenWidth: number;
      screenHeight: number;
      statusHeight: number;
      notchHeight: number;
      marginBottom: number;
      isIphoneX: boolean;
    };

    colors: {
      yellow: string;
      white: string;
      black: string;
      body: string;
      green: string;
      transparent: string;
      lightRed: string;
      red: {
        200: string;
        300: string;
        500: string;
      };
      gray: {
        200: string;
        300: string;
        400: string;
        500: string;
      };
      blue: {
        300: string;
        400: string;
        500: string;
      };
    };

    fonts: {
      regular: string;
      medium: string;
      bold: string;
    };

    general: {
      shadow: ReturnType<typeof css>;
    };
  }
}
