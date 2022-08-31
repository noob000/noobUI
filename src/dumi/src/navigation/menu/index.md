# Menu

## Horizontal

```tsx
import React from "react";
import {testItem} from "./menu.test"
import Menu from "./index"
export default ()=>
<div style={{height:"300px"}}>
<Menu items={testItem}/>

</div>

```

## Vertical

```tsx
import React from "react";
import {testItem} from "./menu.test"
import Menu from "./index"
export default ()=>
   <div style={{width:"200px"}}>
<Menu items={testItem} mode="vertical"/>
  </div>

```

## Inline

```tsx
import React from "react";
import {testItem} from "./menu.test"
import Menu from "./index"
export default ()=>
   <div style={{width:"200px"}}>
          <Menu items={testItem} mode="inline"/>
  </div>

```

<API ></API>
