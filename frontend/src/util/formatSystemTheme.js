const talkcorpTheme =   {
    scrollbarStyles: {
        "&::-webkit-scrollbar": {
            width: '8px',
            height: '8px',
        },
        "&::-webkit-scrollbar-thumb": {
            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
            backgroundColor: "#0090CB",
        },
    },
    scrollbarStylesSoft: {
        "&::-webkit-scrollbar": {
            width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: mode === "light" ? "#F3F3F3" : "#333333",
        },
    },
    palette: {
        type: mode,
        primary: { main: mode === "light" ? "#0090CB" : "#FFFFFF" },
        textPrimary: mode === "light" ? "#0090CB" : "#FFFFFF",
        borderPrimary: mode === "light" ? "#0090CB" : "#FFFFFF",
        dark: { main: mode === "light" ? "#333333" : "#F3F3F3" },
        light: { main: mode === "light" ? "#F3F3F3" : "#333333" },
        tabHeaderBackground: mode === "light" ? "#EEE" : "#666",
        optionsBackground: mode === "light" ? "#fafafa" : "#333",
                        options: mode === "light" ? "#fafafa" : "#666",
                        fontecor: mode === "light" ? "#128c7e" : "#fff",
        fancyBackground: mode === "light" ? "#fafafa" : "#333",
                        bordabox: mode === "light" ? "#eee" : "#333",
                        newmessagebox: mode === "light" ? "#eee" : "#333",
                        inputdigita: mode === "light" ? "#fff" : "#666",
                        contactdrawer: mode === "light" ? "#fff" : "#666",
                        announcements: mode === "light" ? "#ededed" : "#333",
                        login: mode === "light" ? "#fff" : "#1C1C1C",
                        announcementspopover: mode === "light" ? "#fff" : "#666",
                        chatlist: mode === "light" ? "#eee" : "#666",
                        boxlist: mode === "light" ? "#ededed" : "#666",
                        boxchatlist: mode === "light" ? "#ededed" : "#333",
        total: mode === "light" ? "#fff" : "#222",
        messageIcons: mode === "light" ? "grey" : "#F3F3F3",
        inputBackground: mode === "light" ? "#FFFFFF" : "#333",
        barraSuperior: mode === "light" ? "linear-gradient(to right, #0090CB, #682EE3 , #0090CB)" : "#666",
                        boxticket: mode === "light" ? "#EEE" : "#666",
                        campaigntab: mode === "light" ? "#ededed" : "#666",
                        mediainput: mode === "light" ? "#ededed" : "#1c1c1c",
    }
}


export default function formatSystemTheme(mode){
    const whitelabel = process.env.REACT_APP_WHITELABEL
    let theme;
    switch (whitelabel) {
        case "talkcorp":
          theme = talkcorpTheme;
          
          break;
        case "we3":
          break;
        default:
          // Código a ser executado se nenhum dos casos anteriores for correspondente
          break;
    }
    theme.mode = mode;
    return theme;
}