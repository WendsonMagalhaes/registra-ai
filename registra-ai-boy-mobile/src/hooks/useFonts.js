import { useFonts } from "expo-font";

export const useCustomFonts = () => {
    const [fontsLoaded] = useFonts({
        "Aldrich-Regular": require("../../assets/Fonts/Aldrich-Regular.ttf"),
    });

    return fontsLoaded;
};
