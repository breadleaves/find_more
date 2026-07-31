// ==UserScript==
// @name         Find More Plus
// @version      1.5
// @license MIT
// @description  Find more about your favorite camgirl
// @icon         https://stripchat.com/favicon.ico
// @match        https://stripchat.com/*
// @match        https://*.stripchat.com/*
// @match        https://chaturbate.com/*
// @match        https://*.chaturbate.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const common = {
        getModelName() {
            const path = window.location.pathname.split('/');
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

        makeButtons(modelName, cls) {
            const buttons = [
                common.createButton(
                    'simpcity-button',
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" width="24" height="24">
                       <path fill="currentColor" fill-rule="evenodd" d="M23.073 30.075a10.19 10.19 0 0 1-1.142.064H16V35s-.806-.163-2-.623C10.586 33.064 4 29.33 4 20.07C4 14.51 8.508 10 14.07 10h7.86c4.852 0 8.903 3.431 9.857 8h4.158A8.056 8.056 0 0 1 44 26.056c0 7.279-5.828 10.29-9 11.389c-1.185.411-2 .555-2 .555v-3.889h-2.944a8.047 8.047 0 0 1-6.983-4.036ZM14 28.139v4.075a15.558 15.558 0 0 1-2.828-1.612C8.582 28.729 6 25.554 6 20.069A8.07 8.07 0 0 1 14.07 12h7.86a8.07 8.07 0 0 1 8.056 7.597a10.05 10.05 0 0 1-3.604 7.204a8.033 8.033 0 0 1-4.451 1.338H14Zm13.575.27a12.09 12.09 0 0 1-2.232 1.45a6.046 6.046 0 0 0 4.713 2.252H35v3.201a14.757 14.757 0 0 0 2.433-1.225C39.8 32.592 42 30.164 42 26.056A6.056 6.056 0 0 0 35.945 20H32v.07c0 3.469-1.755 6.529-4.425 8.34Z" clip-rule="evenodd"/>
                     </svg>`,
                    () => window.open(`https://nobodyhome.ws/search.php?action=do_search&postthread=1&keywords=${modelName}`, '_blank'),
                    (cls ? cls + ' ' : '') + 'simpcity-button'
                ),

                common.createButton(
                    'cgfinder-button',
                    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                     </svg>`,
                    () => {
                        const site = window.location.hostname.includes("stripchat") ? "sc" : "cb";
                        window.open(`https://camgirlfinder.net/models/${site}/${modelName}`, '_blank');
                    },
                    cls
                ),

                common.createButton(
                    'recume-button',
                    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"/>
                      </svg>`,
                    () => {
                        const site = window.location.hostname.includes("stripchat") ? "sc" : "cb";
                        window.open(`https://nrtool.st/nrtool/history/${site}/${modelName}/1?group_by=week`, '_blank');
                    },
                    cls
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
                       <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>
                      </svg>`,
                    () => {
                        const urls = [
                            `https://forums.socialmediagirls.com/search/569998932/?q=${encodeURIComponent(modelName)}&o=relevance`,
                            `https://simpcity.cr/search/250796390/?q=${encodeURIComponent(modelName)}&o=date`
                        ];
                        urls.forEach((url, i) => setTimeout(() => window.open(url, '_blank'), i * 200));
                    },
                    cls
                ),

                common.createButton(
                    'recume-performer-button',
                    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                       <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"/>
                      </svg>`,
                    () => window.open(`https://recu.me/performer/${modelName}`, '_blank'),
                    cls
                ),

                common.createButton(
                    'statbate-button',
                    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/>
                      </svg>`,
                    () => {
                        const site = window.location.hostname.includes("stripchat") ? 2 : 1;
                        window.open(`https://statbate.com/search/${site}/${modelName}`, '_blank');
                    },
                    cls
                )
            ];
            buttons.find(b => b.id === 'recume-performer-button').dataset.cbOnly = '1';
            return buttons;
        }
    };

    function initStripchat() {
        let inserted = false;
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

        const observer = new MutationObserver(() => {
            if (inserted) return;
            const modelName = common.getModelName();
            const target = document.querySelector('.view-cam-buttons-wrapper');
            if (!modelName || !target) return;

            ['simpcity-button','cgfinder-button','recume-button','search-button','camwhores-button','forum-button','recume-performer-button','statbate-button'].forEach(id => {
                const old = document.getElementById(id); if (old) old.remove();
            });

            const group = document.createElement('div');
            group.style.display = 'flex';
            group.style.gap = '18px';
            group.style.alignItems = 'center';
            common.makeButtons(modelName, 'scfinder-tab')
                .filter(b => !b.dataset.cbOnly)
                .forEach(btn => group.appendChild(btn));
            target.parentNode.insertBefore(group, target);
            inserted = true;
        });
        observer.observe(document.body, {childList: true, subtree: true});
        setTimeout(() => { observer.takeRecords(); }, 800);
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

            ['simpcity-button','cgfinder-button','recume-button','search-button','camwhores-button','forum-button','recume-performer-button','statbate-button'].forEach(id => {
                const el=document.getElementById(id); if(el) el.remove();
            });

            common.makeButtons(model, 'cgfinder-tab').reverse().forEach(btn => bar.insertBefore(btn, bar.firstChild));
        }, 1000);
    }

    if (window.location.hostname.includes('stripchat')) initStripchat();
    else if (window.location.hostname.includes('chaturbate')) initChaturbate();
})();
