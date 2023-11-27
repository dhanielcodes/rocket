/* eslint-disable no-unused-vars */

import React, { useState } from 'react'
import { Modal, Button ,Alert} from '@arco-design/web-react';

// eslint-disable-next-line react/prop-types
function Modals({text,show}) {
  
  // const [showmodal,setshowmaodal ] = useState(show);
  
  return (
    <Modal
    title='Modal Title'
    visible={show}
    // onOk={() => setshowmaodal(null)}
    // onCancel={() => setshowmaodal(null)}
    autoFocus={false}
    focusLock={true}
    
  >
  <p>
     {text}
    </p>
  </Modal>
  )
}

export default Modals