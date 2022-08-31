# Message

```tsx
import React from 'react';
import Message from "./index";
export default ()=>{
    return (
        <div>
        <div>
        <button onClick={()=>{Message.success("Success!")}}>success</button>
        </div>
        <div>
        <button onClick={()=>{Message.warn("Warn!")}}>warn</button>
        </div>
        <div>
        <button onClick={()=>{Message.error("Error!")}}>
        error
        </button>
        </div>
        <div>
        <button onClick={()=>{Message.info("Info!")}}>
        info
        </button>
        </div>
        </div>
    )
}

```

<API src="./doc.tsx"></API>
