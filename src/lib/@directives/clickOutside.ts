type ClickOutsideCb = (event: Event) => void;

export function clickOutside(node: Node, cb: ClickOutsideCb) {
    const handleClick = (event: Event) => {
      if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
        cb(new CustomEvent('click_outside', {detail: node}));
      }
    }
    
    document.addEventListener('click', handleClick, true);
    
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    }
  }