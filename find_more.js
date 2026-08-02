// ==UserScript==
// @name         Find More Plus
// @version      3.0
// @license MIT
// @description  Find more about your favorite camgirl
// @icon         https://stripchat.com/favicon.ico
// @updateURL    https://raw.githubusercontent.com/breadleaves/find_more/main/find_more.js
// @downloadURL  https://raw.githubusercontent.com/breadleaves/find_more/main/find_more.js
// @match        https://stripchat.com/*
// @match        https://*.stripchat.com/*
// @match        https://chaturbate.com/*
// @match        https://*.chaturbate.com/*
// @match        https://cam4.com/*
// @match        https://www.cam4.com/*
// @match        https://camsoda.com/*
// @match        https://www.camsoda.com/*
// @match        https://recu.me/*
// @match        https://*.recu.me/*
// @match        https://chaturfier.com/*
// @match        https://*.chaturfier.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const common = {
        SITES: {
            cb: { nrtool: 'cb', cgfinder: 'cb', statbate: 1 },
            sc: { nrtool: 'sc', cgfinder: 'sc', statbate: 2 },
            cam4: { nrtool: 'cam4', cgfinder: 'c4', statbate: null },
            cs: { nrtool: 'cs', cgfinder: 'cs', statbate: 4 },
            recu: { nrtool: 'cb', cgfinder: 'cb', statbate: 1 },
            cf: { nrtool: 'cb', cgfinder: 'cb', statbate: 1 }
        },

        getSiteKey() {
            const host = window.location.hostname;
            if (host.includes('stripchat')) return 'sc';
            if (host.includes('chaturbate')) return 'cb';
            if (host.includes('cam4')) return 'cam4';
            if (host.includes('camsoda')) return 'cs';
            if (host.includes('recu.me')) return 'recu';
            if (host.includes('chaturfier')) return 'cf';
            return null;
        },

        getModelName() {
            const path = window.location.pathname.split('/');
            if (path[1] === 'performer' && path[2]) return path[2];
            if (path[1] === 'cams' && path[2]) return path[2];
            const model = path[1];
            if (model && !['female', 'male', 'trans', 'new', 'tags', 'login', 'signup'].includes(model)) {
                return model;
            }
            return null;
        },

        createButton(id, svg, onClick, className) {
            const a = document.createElement('a');
            a.href = '#';
            a.className = className || '';
            a.innerHTML = svg;
            a.id = id;
            a.addEventListener('click', e => {
                e.preventDefault();
                onClick();
            });
            return a;
        },

        makeButtons(siteKey, modelName, cls) {
            const cfg = common.SITES[siteKey];
            const nrtoolSuffix = (siteKey === 'cb' || siteKey === 'sc' || siteKey === 'cf') ? '/1?group_by=week' : '';
            const CB_BADGE = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><defs><linearGradient id=\"cbmark\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f47320\"/><stop offset=\"1\" stop-color=\"#fec549\"/></linearGradient></defs><rect x=\"1\" y=\"1\" width=\"22\" height=\"22\" rx=\"7\" fill=\"url(#cbmark)\"/><g transform=\"translate(4.5 4.54) scale(0.0293)\"><path fill=\"#fff\" d=\"M124 18h15l.044 4.858c.059 5.994.136 11.988.218 17.981q.051 3.88.084 7.757c.034 3.734.087 7.467.142 11.2l.02 3.459c.12 6.715.973 12.713 2.799 19.181.61 2.254.994 4.374 1.256 6.689.165 2.998.165 2.998 2.437 4.875.466 1.665.93 3.332 1.371 5.004 1.114 3.536 2.91 6.724 4.629 9.996l1.305 2.844c1.916 3.567 4.25 6.545 6.882 9.594l1.463 1.718c3.377 3.9 6.934 7.367 10.987 10.574L174 135v2l1.875.313C178 138 178 138 180 141c2.552 1.205 2.552 1.205 5 2v2l2.438.375L190 146l1 2a148 148 0 0 0 7 3c3.527 1.454 6.807 2.872 10 5h4c.182-.638.364-1.276.55-1.934.252-.826.504-1.652.762-2.504l.739-2.496L215 147l3-1v-6l4-2-.187-2.312C222 133 222 133 223.355 131.652c2.657-2.669 3.827-6.074 5.364-9.472C230 120 230 120 233 119a126 126 0 0 0 2-6c1.265-2.365 2.39-4.411 4.324-6.277 3.16-3.248 5.66-7.06 8.324-10.715 2.279-2.914 4.71-5.426 7.352-8.008a254 254 0 0 0 4.668-5.645L261 81h2l2-4h2l2-4h2l1-3c1.453-1.21 1.453-1.21 3.25-2.375 3.3-2.245 5.957-4.76 8.75-7.625 3.397-3.225 6.17-5.574 11-6l1-3c3.52-2.64 6.923-4.415 11-6l2-2a90 90 0 0 1 6-1v-2l2.938-1.25a1293 1293 0 0 0 8.937-3.875l2.305-1.008c1.795-.73 1.795-.73 2.82-1.867 2.247-.533 4.507-.963 6.773-1.402 2.488-.54 2.488-.54 5.227-2.598a82 82 0 0 1 5.375-1c2.874-.443 5.324-.87 7.996-2.031 3.418-1.26 6.717-1.347 10.317-1.469 4.608-.212 8.992-.502 13.5-1.562 8.636-1.928 17.138-1.255 25.718.562 4.638.75 9.3.885 13.993.982 5.063.186 8.502 1.416 13.101 3.518 2.412.446 2.412.446 4.625.5 3.895.322 6.082 1.333 9.375 3.5q3.498 1.009 7 2l2 2 2.73.906c3.505 1.173 6.4 2.723 9.582 4.594l3.176 1.844C475 44 475 44 476 46q2.496 1.505 5 3c5.424 4.388 10.671 8.796 14 15v2l3 1c3.408 3.508 4.548 6.146 5 11l3 1c.914 2.18.914 2.18 1.625 4.875l.727 2.68L509 89l1 3h2q.113 10.413.165 20.825.022 3.544.061 7.09c.037 3.39.054 6.78.067 10.17.015 1.062.03 2.124.047 3.218v2.972l.02 2.624L512 141l-3 2c-.922 2.564-1.518 5.137-2.156 7.785L506 153l-3 1-1 7h-2l-.812 3.438L498 168l-3 1-.75 2.5c-2.51 7.029-7.977 12.366-13.25 17.5l-2.312 2.938c-2.536 3.12-5.525 5.288-8.774 7.625-2.551 1.916-4.69 4.154-6.914 6.437-4.17 3.648-8.236 6.695-13.25 9.063-1.93.817-1.93.817-2.75 2.937a399 399 0 0 1-6 3l-2.875 1.938c-10.307 6.802-22.38 11.645-34.137 15.28-2.175.703-2.175.703-3.988 2.782-2.059.563-2.059.563-4.437 1-3.277.605-4.693 1.087-7.563 3a73 73 0 0 1-4.937 1c-2.566.433-4.671.796-6.985 2-2.76 1.329-5.358 1.601-8.39 2-3.575.505-6.844 1.046-10.313 2.063-3.945 1.095-7.718 1.345-11.79 1.652-3.049.336-5.712 1.234-8.585 2.285h-4l-.184 1.898-.253 2.477-.247 2.46C332 265 332 265 331 267h-2l-.148 2.266-.227 2.984c-.07.975-.14 1.95-.21 2.953C328 278 328 278 327.058 279.88c-1.553 3.11-2.011 6.416-2.622 9.808-1.31 7.186-1.31 7.186-2.437 8.313-.113 2.474-.164 4.92-.168 7.395l-.01 2.253q-.007 2.367-.007 4.734c-.002 2.41-.02 4.82-.04 7.23l-.005 4.595-.022 2.182c.017 3.762.303 6.383 2.252 9.611l1 3.563c.837 3.518.837 3.518 3 6.437 5.027 2.488 10.44 3.78 16 3 2.623-1.131 5.115-2.403 7.625-3.766C354 344 354 344 357.563 342.875L360 342l1-3c1.566-1.508 1.566-1.508 3.563-3.125 6.777-5.768 12.326-11.97 16.437-19.875l2-3h2l.375-3.375C386 306 386 306 388 304c.387-2.035.387-2.035.5-4.312.18-2.658.458-4.589 1.504-7.055 1.22-3.226 1.308-6.005 1.433-9.445.713-12.338.713-12.338 4.563-16.188a68 68 0 0 1 4.425-.161l2.853-.03 3.109-.012 3.18-.017q3.344-.014 6.687-.02c3.402-.01 6.803-.04 10.205-.072q3.245-.01 6.49-.016l3.079-.038c5.517.018 9.121.476 13.972 3.366l3.625.5c3.592.532 4.637 1.292 7.375 3.5l2.625.813c8.265 2.907 14.507 7.82 20.375 14.187l2.563 2.375c3.317 3.573 5.856 7.5 8.437 11.625l1.129 1.785c4.416 7.326 7.22 14.604 7.695 23.184.056 2.098.056 2.098 1.176 4.031.096 1.62.13 3.244.133 4.867l.004 2.934-.012 3.074.012 3.05-.004 2.942-.004 2.691c-.121 2.298-.531 4.23-1.129 6.442-.148 2.124-.27 4.249-.375 6.375-.345 4.997-1.17 8.227-3.625 12.625a61 61 0 0 0-.5 4.125c-.517 4.008-1.088 4.884-3.5 7.875a118 118 0 0 0-2 7h-2l-1 7-3 1-.312 3.375L487 411l-3 2a104 104 0 0 0-2 5c-1.3 2.373-2.468 4.47-4.39 6.383-1.831 1.84-3.352 3.802-4.923 5.867-5.173 6.709-10.453 13.469-17.187 18.688-2.073 1.71-3.439 3.164-5.062 5.25-2.458 2.835-2.993 3.197-6.438 3.812l-1 3c-3.205 3.027-5.604 4.498-10 5l-1 3c-2.223 1.465-2.223 1.465-5.062 2.938l-3.028 1.582L421 475l-2.191 1.137c-1.924.983-3.86 1.93-5.809 2.863l-2.105 1.027c-5.054 2.37-10.105 3.98-15.512 5.36A81 81 0 0 0 390 487v3h-77v-3c-3.403-1.276-6.521-2.114-10.125-2.437-3.97-.577-4.903-1.166-7.875-3.563a511 511 0 0 0-7-2c-3.04-1.248-6.014-2.63-9-4-2.328-1.012-4.664-2.006-7-3v-2l-2.687-.812c-5.519-1.979-9.936-5.275-14.625-8.75l-1.667-1.21c-1.379-1.026-2.705-2.122-4.021-3.228v-2l-1.687-.187c-5.548-1.95-9.602-8.366-13.38-12.665a93 93 0 0 0-4.87-5.023C227 434 227 434 226 431l-3-1c-1.387-1.742-1.387-1.742-2.687-3.875l-1.325-2.117C218 422 218 422 218 419l-3-1a85 85 0 0 1-4.062-6.25l-1.065-1.738c-1.96-3.255-3.511-6.474-4.873-10.012a459 459 0 0 0-3-5.875c-2.215-4.376-3.816-8.387-5-13.125l-1.125-2c-1.306-2.985-.998-5.79-.875-9h-2c-1.922-3.973-2.36-7.575-2.656-11.914-.246-2.386-.246-2.386-2.344-5.086a153 153 0 0 1-1-8.375 496 496 0 0 0-.437-4.523l-.184-2.021c-.32-2.182-.32-2.182-1.388-4.472-1.12-2.95-1.307-5.301-1.405-8.449l-.118-3.436-.093-3.661-.113-3.8a773 773 0 0 1 .113-46.95l.093-3.28c.04-1.005.078-2.01.118-3.045l.095-2.702C184 256 184 256 186 253l-2.887-.148-3.8-.227c-1.242-.07-2.483-.14-3.762-.21-3.297-.385-5.516-1.185-8.551-2.415a103 103 0 0 0-6.312-.437c-4.736-.293-8.291-.977-12.59-2.875-2.748-.901-5.34-1.018-8.223-1.188-4.76-.286-7.636-1.288-11.875-3.5-1.66-.22-3.33-.381-5-.5-4.34-.311-7.14-1.441-11-3.5a353 353 0 0 0-7-1l-3-2a65 65 0 0 0-4.5-1c-3.253-.607-4.647-1.098-7.5-3l-3.5-1c-3.5-1-3.5-1-6.5-3l-3.187-.875c-4.271-1.26-7.887-3.067-11.813-5.125q-1.875-.908-3.75-1.812c-3.645-1.83-7.202-3.802-10.75-5.813l-3.156-1.79c-.774-.522-1.547-1.046-2.344-1.585v-2l-2.437-.562C35.62 204.637 30.1 199.39 25 194l-2.312-2.187C21 190 21 190 21 188l-3-1c-6.425-6.056-10.782-13.877-14-22l-1.187-2.937L2 160H0v-44h3l.55-2.082.763-2.73.738-2.708c.988-2.582 1.944-3.648 3.949-5.48a402 402 0 0 0 3-6c1.563-2.375 1.563-2.375 3-4h2l.188-1.687C18.34 88.033 20.51 86.406 23 84l2.535-2.535L33 74l2.121-2.246C37 70 37 70 40 69l2.063-2.062L44 65h2v-2c2.195-1.621 2.195-1.621 5.125-3.437l3.031-1.883c2.135-1.261 4.234-2.43 6.469-3.492 2.51-.959 2.51-.959 3.375-3.188a133 133 0 0 1 6-3c4.334-2.027 4.334-2.027 8-5a90 90 0 0 1 6-1v-2l3-1.25c3.41-1.457 6.705-3.09 10.008-4.773 1.93-.947 3.879-1.785 5.867-2.602 3.154-1.162 3.154-1.162 5.125-3.375l6-2a113 113 0 0 0 4.25-1.875l2.016-.93c2.19-1.304 2.19-1.304 3.734-5.195m241.074 37.89-2.243.235c-3.897.465-7.268 1.213-10.831 2.875v2l-3 .313c-7.124 1.042-13.292 4.247-19.637 7.511C327 70 327 70 323.625 71.313 305.575 79.716 288.505 95.612 276 111l-1.45 1.637c-3.435 3.908-5.55 7.09-5.55 12.363l-3 1v3h-2c-7.946 8.131-15.27 19.583-17 31h-2l-1.25 3.063c-1.358 3.189-3.003 6.113-4.77 9.097-1.676 3.146-2.768 6.492-3.98 9.84l-1 1c-.535 2.508-.964 5.028-1.402 7.555C232 193 232 193 230 196a424 424 0 0 1-4.75-.375c-.882-.07-1.763-.14-2.672-.21-2.597-.418-4.287-1.17-6.578-2.415-1.64-.46-3.28-.917-4.926-1.36-3.402-1.05-6.656-2.459-9.937-3.835-2.068-.922-2.068-.922-4.137-.805v-2l-2.012-.77c-4.576-1.783-8.854-3.548-12.988-6.23-3.48-2.063-6.68-3.872-10.437-5.375-3.556-1.622-6.219-3.44-9.27-5.836-1.68-1.31-3.39-2.581-5.117-3.828-7.049-5.108-13.242-10.595-19.176-16.961l-1.883-2.012c-2.882-3.21-4.647-5.893-6.117-9.988-1.904-3.273-1.904-3.273-4-6h-2l-1.465-6.055c-.483-2.004-.483-2.004-1.535-3.945h-2l-.812-2.937c-.78-2.738-1.64-5.433-2.563-8.126-2.11-6.242-3.84-12.595-5.625-18.937l-1.082-3.434c-1-3.885-1.33-7.5-1.543-11.504l-.117-2.072A712 712 0 0 1 107 66c-4.966-.393-7.381.437-11.375 3.375l-2.648 1.898L91 73v2l-2.187.313c-3.09.755-5.23 1.842-7.813 3.687v2l-2.25.313c-3.008.752-4.313 1.823-6.75 3.687l-3.125 1.125C61.4 89.154 55.541 96.291 50 102l-1.625 1.5c-1.517 1.537-1.517 1.537-2.687 3.875C43.6 110.62 40.954 112.539 38 115c-6.154 9.145-8.268 19.359-6.68 30.184C33.428 155.01 38.93 162.094 46 169l1.734 1.836 1.828 1.914 1.692 1.797c1.934 1.61 3.334 1.902 5.746 2.453l1 2 2.125.75C63 181 63 181 65.875 183.75c3.897 3.491 8.336 5.12 13.157 6.924 4.552 1.715 8.783 3.693 13.093 5.951 6.479 3.305 12.873 5.469 19.875 7.375q2.04.585 4.078 1.176c9.034 2.592 18.123 4.867 27.273 7.01 20.774 4.877 20.774 4.877 24.649 6.814 2.043.28 4.093.512 6.145.719l3.74.386 3.928.395q3.822.387 7.644.781l3.437.346c3.106.373 3.106.373 5.711.898 2.447.485 4.768.679 7.258.791l2.686.127 2.763.12 2.823.13q3.432.159 6.865.307c-.556 5.203-1.169 10.386-1.937 15.563l-.496 3.51c-.34 2.355-.7 4.707-1.1 7.052-2.03 13.248-1.772 26.6-1.728 39.967.012 3.528.005 7.055-.007 10.582q-.009 4.135 0 8.27c.002 1.922-.004 3.845-.01 5.767.052 9.852 1.253 18.673 4.571 27.941.787 2.615 1.155 5.142 1.52 7.848 1.801 11.825 6.515 24.837 12.75 35.063 1.597 2.708 2.539 5.389 3.496 8.375 1.248 2.734 3.022 4.754 4.941 7.062q2.038 2.745 4.063 5.5c11.483 15.305 23.696 30.203 41.937 37.5a323 323 0 0 1 6.203 3.23c1.93.967 1.93.967 4.797.77l1 3c2.25.95 2.25.95 5.031 1.535l3.149.764 3.32.764 3.227.775q3.178.76 6.366 1.484c1.7.396 3.395.817 5.074 1.295 7.228 1.968 14.69 1.72 22.124 1.699 2.374-.003 4.747.02 7.121.045 9.612.038 18.251-.87 27.588-3.361v-2l3.688-.687c6.286-1.404 12.55-3.423 18.312-6.313l1-3c2.313-1.035 2.313-1.035 5-2 15.985-8.96 32.916-24.782 41.098-41.203.902-1.797.902-1.797 2.84-3.61 2.1-2.227 3.055-4.206 4.156-7.035 1.104-2.622 2.445-5.078 3.781-7.59 2.439-4.835 4.316-9.66 5.938-14.812l.626-1.967c3.85-12.758 5.073-28.914-.877-41.1-2.588-4.445-5.439-8.6-8.562-12.683l-2.062-2.937c-2.384-2.538-4.737-3.74-7.938-5.063h-2v-2c-9.368-3.4-18.193-3.31-28-3l-.148 2.484-.227 3.266c-.07 1.067-.14 2.135-.21 3.234-.393 2.858-1.08 4.518-2.415 7.016v3h-2l-1.242 2.59-1.633 3.348-1.617 3.34C410 330 410 330 408 331l-1.125 2.938c-4.688 11.418-17.287 24.214-27.512 30.976L378 366v2l-8 4v2l-2.312.75a184 184 0 0 0-6.29 2.238c-5.157 1.954-9.854 3.636-15.398 4.012l-2.871.262c-7.61.396-13.945-.716-21.192-2.95l-2.452-.738c-5.005-1.659-7.975-3.497-11.485-7.574l-2.465-2.508C297.906 359.417 291.432 351.455 291 340h-2c-.827-7.665-1.162-15.23-1.125-22.937l.015-3.205c.102-13.28.965-26.007 6.188-38.42 1.079-2.852 1.393-5.473 1.735-8.5.835-5.836 2.49-10.677 4.898-16.036 1.239-2.789 2.284-5.584 3.289-8.464 1.733-4.886 3.819-9.545 6.047-14.223 1.085-2.12 1.085-2.12.953-4.215l2.108-.06c3.173-.096 6.345-.205 9.517-.315l3.316-.094c5.434-.197 9.933-.598 15.059-2.531q3.15-.311 6.313-.437c4.848-.313 8.856-1.035 13.382-2.743 2.714-.966 5.443-1.643 8.243-2.32 5.416-1.314 10.742-2.84 16.062-4.5v-2l3.313-.375c3.76-.38 3.76-.38 6.687-2.625 1.32-.476 2.656-.91 4-1.312 5.544-1.772 10.745-4.203 16-6.688v-2c.83-.235 1.66-.47 2.516-.71 4.113-1.523 7.549-3.566 11.234-5.915l2.15-1.366c16.503-10.626 30.316-23.953 40.1-41.009l1.602-2.535c8.415-14.833 8.088-33.632 3.808-49.676C472.898 84.272 465.884 77.347 457 71l-2.148-1.066C452.795 68.897 451.598 67.64 450 66c-16.358-9.437-34.137-11.354-52.655-11.26-2.511.01-5.023 0-7.534-.013-8.293-.008-16.487.28-24.737 1.164\"/></g></svg>";
            const buttons = [
                common.createButton(
                    'recume-button',
                    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"/>
                      </svg>`,
                    () => {
                        window.open(`https://nrtool.st/nrtool/history/${cfg.nrtool}/${modelName}${nrtoolSuffix}`, '_blank');
                    },
                    cls
                ),

                common.createButton(
                    'cgfinder-button',
                    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                     </svg>`,
                    () => {
                        window.open(`https://camgirlfinder.net/models/${cfg.cgfinder}/${modelName}`, '_blank');
                    },
                    cls
                ),

                common.createButton(
                    'simpcity-button',
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" width="24" height="24">
                       <path fill="currentColor" fill-rule="evenodd" d="M23.073 30.075a10.19 10.19 0 0 1-1.142.064H16V35s-.806-.163-2-.623C10.586 33.064 4 29.33 4 20.07C4 14.51 8.508 10 14.07 10h7.86c4.852 0 8.903 3.431 9.857 8h4.158A8.056 8.056 0 0 1 44 26.056c0 7.279-5.828 10.29-9 11.389c-1.185.411-2 .555-2 .555v-3.889h-2.944a8.047 8.047 0 0 1-6.983-4.036ZM14 28.139v4.075a15.558 15.558 0 0 1-2.828-1.612C8.582 28.729 6 25.554 6 20.069A8.07 8.07 0 0 1 14.07 12h7.86a8.07 8.07 0 0 1 8.056 7.597a10.05 10.05 0 0 1-3.604 7.204a8.033 8.033 0 0 1-4.451 1.338H14Zm13.575.27a12.09 12.09 0 0 1-2.232 1.45a6.046 6.046 0 0 0 4.713 2.252H35v3.201a14.757 14.757 0 0 0 2.433-1.225C39.8 32.592 42 30.164 42 26.056A6.056 6.056 0 0 0 35.945 20H32v.07c0 3.469-1.755 6.529-4.425 8.34Z" clip-rule="evenodd"/>
                     </svg>`,
                    () => window.open(`https://nobodyhome.ws/search.php?action=do_search&postthread=1&keywords=${modelName}`, '_blank'),
                    (cls ? cls + ' ' : '') + 'simpcity-button'
                ),

                common.createButton(
                    'search-button',
                    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"/>
                     </svg>`,
                    () => {
                        const urls = [
                            `https://cse.google.com/cse?cx=c4009c8a01fac429e#gsc.tab=0&gsc.q=intitle:${modelName}&gsc.sort=date`,
                            `https://yandex.com/search/?text=%22${modelName}%22`
                        ];
                        urls.forEach((url, i) => setTimeout(() => window.open(url, '_blank'), i * 200));
                    },
                    cls
                ),

                common.createButton(
                    'camwhores-button',
                    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                       <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"/>
                      </svg>`,
                    () => window.open(`https://www.camwhores.tv/search/${modelName}/`, '_blank'),
                    cls
                ),

                common.createButton(
                    'forum-button',
                    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/>
                      </svg>`,
                    () => {
                        const urls = [
                            `https://forums.socialmediagirls.com/search/?q=${encodeURIComponent(modelName)}&o=relevance`,
                            `https://simpcity.cr/search/?q=${encodeURIComponent(modelName)}&o=date`,
                            `https://thirsthub.cc/search/?q=${encodeURIComponent(modelName)}&o=date`
                        ];
                        urls.forEach((url, i) => setTimeout(() => window.open(url, '_blank'), i * 200));
                    },
                    cls
                ),

                common.createButton(
                    'recume-performer-button',
                    siteKey === 'recu'
                        ? CB_BADGE
                        : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                       <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"/>
                      </svg>`,
                    () => {
                        const url = siteKey === 'recu' ? `https://chaturbate.com/${modelName}/` : `https://recu.me/performer/${modelName}`;
                        window.open(url, '_blank');
                    },
                    cls
                ),

                common.createButton(
                    'chaturbate-button',
                    CB_BADGE,
                    () => window.open(`https://chaturbate.com/${modelName}/`, '_blank'),
                    (cls ? cls + ' ' : '') + 'chaturbate-button'
                ),

                common.createButton(
                    'chaturfier-button',
                    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                       <circle cx="12" cy="12" r="10"/>
                       <line x1="14.31" y1="8" x2="20.05" y2="17.94"/>
                       <line x1="9.69" y1="8" x2="21.17" y2="8"/>
                       <line x1="7.38" y1="12" x2="13.12" y2="2.06"/>
                       <line x1="9.69" y1="16" x2="3.95" y2="6.06"/>
                       <line x1="14.31" y1="16" x2="2.83" y2="16"/>
                       <line x1="16.62" y1="12" x2="10.88" y2="21.94"/>
                      </svg>`,
                    () => window.open(`https://chaturfier.com/cams/${modelName}/`, '_blank'),
                    cls
                ),

                common.createButton(
                    'statbate-button',
                    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/>
                      </svg>`,
                    () => {
                        window.open(`https://statbate.com/search/${cfg.statbate}/${modelName}`, '_blank');
                    },
                    cls
                )
            ];
            buttons.find(b => b.id === 'recume-performer-button').dataset.sites = 'cb,recu,cf';
            buttons.find(b => b.id === 'statbate-button').dataset.sites = 'cb,sc,cs,recu,cf';
            buttons.find(b => b.id === 'chaturbate-button').dataset.sites = 'cf';
            buttons.find(b => b.id === 'chaturfier-button').dataset.sites = 'cb';
            if (siteKey === 'recu') {
                const cb = buttons.find(b => b.id === 'recume-performer-button');
                buttons.splice(buttons.indexOf(cb), 1);
                buttons.unshift(cb);
            }
            return buttons;
        },

        filterForSite(buttons, siteKey) {
            return buttons.filter(b => !b.dataset.sites || b.dataset.sites.split(',').includes(siteKey));
        },

        mountButtons(selector, config) {
            let lastTarget = null;
            const observer = new MutationObserver(() => {
                const selectors = Array.isArray(selector) ? selector : [selector];
                let target = null;
                for (const sel of selectors) {
                    for (const node of document.querySelectorAll(sel)) {
                        if (node.getClientRects().length > 0) {
                            target = node;
                            break;
                        }
                    }
                    if (target) break;
                }
                if (!target) {
                    for (const sel of selectors) {
                        const node = document.querySelector(sel);
                        if (node) {
                            target = node;
                            break;
                        }
                    }
                }
                if (!target) return;

                let modelName = config.modelName ? config.modelName() : null;
                if (!modelName) modelName = common.getModelName();
                if (!modelName) return;

                const group = document.getElementById(config.id);
                if (group && group.dataset.model === modelName && lastTarget === target && group.isConnected) return;

                if (group) group.remove();

                const newGroup = document.createElement('div');
                newGroup.id = config.id;
                newGroup.dataset.model = modelName;
                if (config.style) config.style(newGroup);
                common.filterForSite(common.makeButtons(config.siteKey, modelName, config.cls), config.siteKey)
                    .forEach(btn => newGroup.appendChild(btn));
                config.insert(target, newGroup);
                lastTarget = target;
            });
            observer.observe(document.body, {childList: true, subtree: true});
        }
    };

    function initStripchat() {
        const css = `
            .scfinder-tab {
                display:inline-flex !important;
                justify-content:center;
                align-items:center;
                width:40px;height:40px;border-radius:50%;
                border:2px solid #feb601;background:inherit;color:inherit;
                transition:all .2s;cursor:pointer;
            }
            /* au hover on met aussi la couleur (currentColor) pour que tous les svg héritent la même couleur */
            .scfinder-tab:hover{background:#feb601;border:2px solid #feb601;color:black;}
            /* Par défaut, icônes stroke-only (évite le remplissage non désiré) */
            .scfinder-tab svg{width:24px;height:24px;stroke:currentColor;fill:none;}
            /* Simpcity doit pouvoir être remplie : on cible sa classe dédiée */
            .simpcity-button svg{fill:currentColor;stroke:currentColor;}
            /* on laisse l'héritage de la couleur au hover — plus de règle forcée vers black */
        `;
        document.head.appendChild(Object.assign(document.createElement("style"), {textContent: css}));

        common.mountButtons('.view-cam-buttons-wrapper', {
            id: 'scfinder-group',
            siteKey: 'sc',
            cls: 'scfinder-tab',
            style(g) {
                g.style.display = 'flex';
                g.style.gap = '18px';
                g.style.alignItems = 'center';
            },
            insert(target, g) {
                target.parentNode.insertBefore(g, target);
            }
        });
    }

    function initChaturbate() {
        const css = `
            .cgfinder-tab {
                height:16px;position:relative;overflow:hidden;border-radius:4px 4px 0 0;
                text-decoration:none;margin-right:2px;font-size:13px;padding:4px 8px;
                float:left;display:block;margin-top:-2px;background:inherit;color:inherit;
                transition:all .2s;
            }
            .cgfinder-tab:hover {background:var(--cg-hover-bg,#202c39);color:var(--cg-hover-color,#f47321);}
            /* Par défaut : icônes stroke-only (évite le remplissage non désiré) */
            .cgfinder-tab svg {vertical-align:middle;stroke:currentColor;fill:none;width:14px;height:14px;}
            /* Simpcity remplit son SVG et hérite de la couleur du parent au hover */
            .simpcity-button svg{fill:currentColor;stroke:currentColor;width:14px;height:14px;}
        `;
        document.head.appendChild(Object.assign(document.createElement("style"), {textContent: css}));

        const nativeTab = document.querySelector('.tabBar a');
        if (nativeTab) {
            nativeTab.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
            const clone = nativeTab.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.left = '-9999px';
            document.body.appendChild(clone);
            const hoverStyles = getComputedStyle(clone);
            document.documentElement.style.setProperty('--cg-hover-bg', hoverStyles.backgroundColor);
            document.documentElement.style.setProperty('--cg-hover-color', hoverStyles.color);
            clone.remove();
        }

        let lastModel = null;
        setInterval(() => {
            const model = common.getModelName();
            if (!model || model === lastModel) return;
            lastModel = model;

            const bar = document.querySelector('.tabBar');
            if (!bar) return;

            ['simpcity-button','cgfinder-button','recume-button','search-button','camwhores-button','forum-button','recume-performer-button','chaturfier-button','statbate-button'].forEach(id => {
                const el=document.getElementById(id); if(el) el.remove();
            });

            common.filterForSite(common.makeButtons('cb', model, 'cgfinder-tab'), 'cb').reverse().forEach(btn => bar.insertBefore(btn, bar.firstChild));
        }, 1000);
    }

    function initCam4() {
        const css = `
            .cam4finder-tab {
                display:inline-flex;justify-content:center;align-items:center;
                width:32px;height:32px;border-radius:50%;
                border:1px solid rgba(255,255,255,.45);background:rgba(255,255,255,.12);color:#fff;
                transition:all .2s;cursor:pointer;
            }
            .cam4finder-tab:hover{background:#ff6c00;border-color:#ff6c00;color:#fff;}
            .cam4finder-tab svg{width:18px;height:18px;stroke:#fff;fill:none;}
            .cam4finder-tab.simpcity-button svg{fill:#fff;stroke:#fff;}
        `;
        document.head.appendChild(Object.assign(document.createElement("style"), {textContent: css}));

        common.mountButtons([
            '[class^="ProfileBanner__buttonsContainerSmall__"]',
            '[class^="index__visitorActions__"]'
        ], {
            id: 'cam4finder-group',
            siteKey: 'cam4',
            cls: 'cam4finder-tab',
            modelName: () => {
                const meta = document.querySelector('meta[name="Description"]');
                if (meta) {
                    const match = meta.content.match(/Watch & Chat with (.+?)\. Streaming/);
                    if (match) return match[1].trim();
                }
                const span = document.querySelector('span[class^="index__performerName__"]');
                if (span) return span.textContent.trim();
                const name = document.querySelector('[class^="index__profileName__"]');
                if (name) return name.textContent.trim();
                return common.getModelName();
            },
            style(g) {
                g.style.display = 'flex';
                g.style.alignItems = 'center';
                g.style.gap = '8px';
                g.style.marginLeft = '10px';
            },
            insert(target, g) {
                target.appendChild(g);
            }
        });
    }

    function initCamsoda() {
        const css = `
            .csfinder-tab {
                display:inline-flex;justify-content:center;align-items:center;
                width:30px;height:30px;border-radius:50%;
                border:1px solid rgba(255,255,255,.3);background:transparent;color:#fff;
                transition:all .2s;cursor:pointer;
            }
            .csfinder-tab:hover{background:#00c0c9;border-color:#00c0c9;color:#fff;}
            .csfinder-tab svg{width:16px;height:16px;stroke:currentColor;fill:none;}
            .simpcity-button svg{fill:currentColor;stroke:currentColor;}
        `;
        document.head.appendChild(Object.assign(document.createElement("style"), {textContent: css}));

        common.mountButtons('[class^="header-module__topLeftMenu--"]', {
            id: 'csfinder-group',
            siteKey: 'cs',
            cls: 'csfinder-tab',
            modelName: () => document.querySelector('[class^="header-module__userTitle--"]')?.textContent.trim() || common.getModelName(),
            style(g) {
                g.style.display = 'flex';
                g.style.alignItems = 'center';
                g.style.gap = '6px';
                g.style.marginLeft = '8px';
            },
            insert(target, g) {
                target.appendChild(g);
            }
        });
    }

    function initRecu() {
        const css = `
            .recufinder-tab {
                display:inline-flex;align-items:center;justify-content:center;
                height:32px;border-radius:6px;padding:0 10px;margin:0 4px 4px 0;
                border:1px solid #ced4da;background:#fff;color:#6c757d;
                text-decoration:none;transition:all .2s;cursor:pointer;
            }
            .recufinder-tab:hover{background:#f8f9fa;border-color:#f0a63e;color:#000;}
            .recufinder-tab svg{width:16px;height:16px;stroke:currentColor;fill:none;}
            .simpcity-button svg{fill:currentColor;stroke:currentColor;}
        `;
        document.head.appendChild(Object.assign(document.createElement("style"), {textContent: css}));

        common.mountButtons('.performer-info-text', {
            id: 'recufinder-group',
            siteKey: 'recu',
            cls: 'recufinder-tab',
            modelName: () => document.querySelector('.performer-info-text a.performer-link b')?.textContent.trim() || common.getModelName(),
            style(g) {
                g.style.display = 'block';
                g.style.marginTop = '12px';
            },
            insert(target, g) {
                target.appendChild(g);
            }
        });
    }

    function initChaturfier() {
        const css = `
            .cffinder-tab {
                display:inline-flex;align-items:center;justify-content:center;
                width:34px;height:34px;border-radius:50%;
                border:1px solid #ced4da;background:#fff;color:#6c757d;
                text-decoration:none;transition:all .2s;cursor:pointer;
            }
            .cffinder-tab:hover{background:#f8f9fa;border-color:#f0a63e;color:#000;}
            .cffinder-tab svg{width:16px;height:16px;stroke:currentColor;fill:none;}
            .simpcity-button svg{fill:currentColor;stroke:currentColor;}
        `;
        document.head.appendChild(Object.assign(document.createElement("style"), {textContent: css}));

        common.mountButtons('.js-profile-meta', {
            id: 'cfinder-group',
            siteKey: 'cf',
            cls: 'cffinder-tab',
            modelName: () => {
                const span = document.querySelector('.js-profile-meta h1 .d-inline-flex span');
                if (span) return span.textContent.trim();
                const meta = document.querySelector('.js-profile-meta');
                if (meta && meta.dataset.name) return meta.dataset.name;
                return null;
            },
            style(g) {
                g.style.display = 'flex';
                g.style.alignItems = 'center';
                g.style.justifyContent = 'center';
                g.style.gap = '8px';
                g.style.margin = '14px 0';
            },
            insert(target, g) {
                target.appendChild(g);
            }
        });
    }

    switch (common.getSiteKey()) {
        case 'sc': initStripchat(); break;
        case 'cb': initChaturbate(); break;
        case 'cam4': initCam4(); break;
        case 'cs': initCamsoda(); break;
        case 'recu': initRecu(); break;
        case 'cf': initChaturfier(); break;
    }
})();
