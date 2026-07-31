// ==UserScript==
// @name         Find More Plus
// @version      1.7
// @license MIT
// @description  Find more about your favorite camgirl
// @icon         https://stripchat.com/favicon.ico
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
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const common = {
        SITES: {
            cb:   { nrtool: 'cb',   cgfinder: 'cb',   statbate: 1 },
            sc:   { nrtool: 'sc',   cgfinder: 'sc',   statbate: 2 },
            cam4: { nrtool: 'cam4', cgfinder: 'c4',   statbate: null },
            cs:   { nrtool: 'cs',   cgfinder: 'cs',   statbate: 4 },
            recu: { nrtool: 'cb',   cgfinder: 'cb',   statbate: 1 }
        },

        getSiteKey() {
            const host = window.location.hostname;
            if (host.includes('stripchat')) return 'sc';
            if (host.includes('chaturbate')) return 'cb';
            if (host.includes('cam4')) return 'cam4';
            if (host.includes('camsoda')) return 'cs';
            if (host.includes('recu.me')) return 'recu';
            return null;
        },

        getModelName() {
            const path = window.location.pathname.split('/');
            if (path[1] === 'performer' && path[2]) return path[2];
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
            const nrtoolSuffix = (siteKey === 'cb' || siteKey === 'sc') ? '/1?group_by=week' : '';
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
                    () => {
                        const url = siteKey === 'recu' ? `https://chaturbate.com/${modelName}/` : `https://recu.me/performer/${modelName}`;
                        window.open(url, '_blank');
                    },
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
            buttons.find(b => b.id === 'recume-performer-button').dataset.sites = 'cb,recu';
            buttons.find(b => b.id === 'statbate-button').dataset.sites = 'cb,sc,cs,recu';
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
                const target = document.querySelector(selector);
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

            ['simpcity-button','cgfinder-button','recume-button','search-button','camwhores-button','forum-button','recume-performer-button','statbate-button'].forEach(id => {
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

        common.mountButtons('[class^="ProfileBanner__buttonsContainerSmall__"]', {
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

    switch (common.getSiteKey()) {
        case 'sc': initStripchat(); break;
        case 'cb': initChaturbate(); break;
        case 'cam4': initCam4(); break;
        case 'cs': initCamsoda(); break;
        case 'recu': initRecu(); break;
    }
})();
