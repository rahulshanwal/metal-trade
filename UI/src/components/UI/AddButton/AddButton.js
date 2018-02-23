import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
    position: 'absolute',
    right: 2,
    top: 2
}

const AddButton = (props) => {
    return (
        <FloatingActionButton style={style} onClick={()=> props.clicked()}>
            <ContentAdd />
        </FloatingActionButton>
    );
}

export default AddButton;