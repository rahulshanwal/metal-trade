import React from 'react';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const style = {color: 'white', cursor: 'pointer'};

const rightElements = (props) => (<Aux>
    <ActionEdit style={style} onClick={()=> props.changeEditMode(true)}/>
    <ActionDelete style={style} onClick={()=> props.onDelete()}/>
  </Aux>);
rightElements.muiName = 'IconMenu';

export default rightElements;