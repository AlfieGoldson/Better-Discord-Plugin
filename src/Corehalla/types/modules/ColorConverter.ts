type RGBColor = [red: number, green: number, blue: number];

export interface ColorConverter {
    getDarkness: (color: any) => any;
    hex2rgb: (color: any) => any;
    int2hex: (color: any) => any;
    int2rgba: (color: any, alpha: any) => any;
    isValidHex: (color: any) => any;

    /**
     * Will get the red green and blue values of any color string.
     * @param color - the color to obtain the red, green and blue values of. Can be in any of these formats: #fff, #ffffff, rgb, rgba
     * @returns - array containing the red, green, and blue values
     */
    getRGB: (color: string) => RGBColor;

    /**
     * Will get the darken the color by a certain percent
     * @param color - Can be in any of these formats: #fff, #ffffff, rgb, rgba
     * @param percent - percent to darken the color by (0-100)
     * @returns new color in rgb format
     */
    darkenColor: (color: string, percent: number) => string;

    /**
     * Will get the lighten the color by a certain percent
     * @param color - Can be in any of these formats: #fff, #ffffff, rgb, rgba
     * @param percent - percent to lighten the color by (0-100)
     * @returns new color in rgb format
     */
    lightenColor: (color: string, percent: number) => string;

    /**
     * Converts a color to rgba format string
     * @param color - Can be in any of these formats: #fff, #ffffff, rgb, rgba
     * @param alpha - alpha level for the new color
     * @returns - new color in rgb format
     */
    rgbToAlpha: (color: string, alpha: number) => string;
}
