import bindAll from 'lodash.bindall';
import React from 'react';

import {connect} from 'react-redux';

import {
    openSpriteLibrary,
    closeBackdropLibrary,
    closeSpriteLibrary
} from '../reducers/modals';

import TargetPaneComponent from '../components/target-pane/target-pane.jsx';

class TargetPane extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChangeSpriteDirection',
            'handleChangeSpriteName',
            'handleChangeSpriteRotationStyle',
            'handleChangeSpriteVisibility',
            'handleChangeSpriteX',
            'handleChangeSpriteY',
            'handleDeleteSprite',
            'handleDuplicateSprite',
            'handleSelectSprite'
        ]);
    }
    handleChangeSpriteDirection (direction) {
        this.props.vm.postSpriteInfo({direction});
    }
    handleChangeSpriteName (name) {
        this.props.vm.renameSprite(this.props.editingTarget, name);
    }
    handleChangeSpriteRotationStyle (rotationStyle) {
        this.props.vm.postSpriteInfo({rotationStyle});
    }
    handleChangeSpriteVisibility (visible) {
        this.props.vm.postSpriteInfo({visible});
    }
    handleChangeSpriteX (x) {
        this.props.vm.postSpriteInfo({x});
    }
    handleChangeSpriteY (y) {
        this.props.vm.postSpriteInfo({y});
    }
    handleDeleteSprite (id) {
        this.props.vm.deleteSprite(id);
    }
    handleDuplicateSprite (id) {
        this.props.vm.duplicateSprite(id);
    }
    handleSelectSprite (id) {
        this.props.vm.setEditingTarget(id);
    }
    render () {
        return (
            <TargetPaneComponent
                {...this.props}
                onChangeSpriteDirection={this.handleChangeSpriteDirection}
                onChangeSpriteName={this.handleChangeSpriteName}
                onChangeSpriteRotationStyle={this.handleChangeSpriteRotationStyle}
                onChangeSpriteVisibility={this.handleChangeSpriteVisibility}
                onChangeSpriteX={this.handleChangeSpriteX}
                onChangeSpriteY={this.handleChangeSpriteY}
                onDeleteSprite={this.handleDeleteSprite}
                onDuplicateSprite={this.handleDuplicateSprite}
                onSelectSprite={this.handleSelectSprite}
            />
        );
    }
}

const {
    onSelectSprite, // eslint-disable-line no-unused-vars
    ...targetPaneProps
} = TargetPaneComponent.propTypes;

TargetPane.propTypes = {
    ...targetPaneProps
};

const mapStateToProps = state => ({
    editingTarget: state.targets.editingTarget,
    sprites: Object.keys(state.targets.sprites).reduce((sprites, k) => {
        let {direction, x, y, ...sprite} = state.targets.sprites[k];
        if (typeof direction !== 'undefined') direction = Math.round(direction);
        if (typeof x !== 'undefined') x = Math.round(x);
        if (typeof y !== 'undefined') y = Math.round(y);
        sprites[k] = {...sprite, direction, x, y};
        return sprites;
    }, {}),
    stage: state.targets.stage,
    spriteLibraryVisible: state.modals.spriteLibrary,
    backdropLibraryVisible: state.modals.backdropLibrary
});
const mapDispatchToProps = dispatch => ({
    onNewSpriteClick: e => {
        e.preventDefault();
        dispatch(openSpriteLibrary());
    },
    onRequestCloseSpriteLibrary: () => {
        dispatch(closeSpriteLibrary());
    },
    onRequestCloseBackdropLibrary: () => {
        dispatch(closeBackdropLibrary());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TargetPane);
