export default class VanillaCaret {
  /**
   * get/set caret position
   * @param {HTMLColletion} target 
   */
  constructor(target) {
    this.target = target
    this.isContentEditable = target && target.contentEditable
  }

  /**
   * get caret position
   * @returns {number} : -1 if elememnt is not in focus
   */
  getPos() {
    // for contentedit field
    if (document.activeElement !== this.target) {
      return -1
    }
    if (this.isContentEditable) {
      this.target.focus()
      let _range = document.getSelection().getRangeAt(0)
      let range = _range.cloneRange()
      range.selectNodeContents(this.target)
      range.setEnd(_range.endContainer, _range.endOffset)
      return range.toString().length
    }
    // for texterea/input element
    return this.target.selectionStart
  }

  /**
   * set caret position
   * @param {number} position - caret position
   */
  setPos(position) {
    if (this.isContentEditable) {
      if (position >= 0) {
        var selection = window.getSelection()
        var range = this.createRange(this.target, {
          count: position
        })
        if (range) {
          range.collapse(false)
          selection.removeAllRanges()
          selection.addRange(range)
        }
      }
    } else {
      this.target.setSelectionRange(position, position)
    }
  }

  createRange(node, chars, range) {
    if (!range) {
      range = document.createRange()
      range.selectNode(node)
      range.setStart(node, 0)
    }
    if (chars.count === 0) {
      range.setEnd(node, chars.count)
    } else if (node && chars.count > 0) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.length < chars.count) {
          chars.count -= node.textContent.length
        } else {
          range.setEnd(node, chars.count)
          chars.count = 0
        }
      } else {
        for (var lp = 0; lp < node.childNodes.length; lp++) {
          range = this.createRange(node.childNodes[lp], chars, range)
          if (chars.count === 0) {
            break
          }
        }
      }
    }
    return range
  }
}