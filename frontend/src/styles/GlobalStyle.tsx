import { createGlobalStyle } from "styled-components";
import "swiper/swiper-bundle.min.css";

const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        overscroll-behavior: none;
        box-sizing: border-box;
    }

    ul, ol, li {
        list-style: none;
    }

    body {
        font-family: "Katuri";
        transition: background-color 0.4s linear;
        overflow: auto;

        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none
    }

    .scrollable {
        overflow: auto;
        &::-webkit-scrollbar {
            display: none;
        }
    }

    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @-moz-keyframes fadeIn { /* Firefox */
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @-webkit-keyframes fadeIn { /* Safari and Chrome */
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }   

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    @-moz-keyframes fadeOut { /* Firefox */
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    @-webkit-keyframes fadeOut { /* Safari and Chrome */
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;

export default GlobalStyle;
