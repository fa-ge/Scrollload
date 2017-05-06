import assign from './assign'

export function setStyles(els, cssObj) {
    if ('transform' in cssObj) {
        cssObj['webkitTransform'] = cssObj['transform']
    }
    if ('transition' in cssObj) {
        cssObj['webkitTransition'] = cssObj['transition']
    }
    els.forEach(el => el && assign(el.style, cssObj))
}

export function addStyleNode(cssText) {
    const styleNode = document.createElement('style')
    styleNode.appendChild(document.createTextNode(cssText))
    document.getElementsByTagName('head')[0].appendChild(styleNode)
}

export function noop() {}
