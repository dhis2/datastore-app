import { PropTypes } from '@dhis2/prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openDialog } from '../../actions/dialogActions.js'
import { fetchNamespaces } from '../../actions/index.js'
import * as dialog from '../../constants/dialogTypes.js'
import SidebarAreaHOC from '../hoc/SidebarAreaHOC.js'
import NamespaceList from './NamespaceList.js'
import styles from './Sidebar.module.css'
import SidebarHeader from './SidebarHeader.js'

export class Sidebar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showDialog: false,
            namespaceListImproved: SidebarAreaHOC(
                NamespaceList,
                props.getNamespaces
            ),
        }
    }

    componentDidMount() {
        this.props.getNamespaces()
    }

    showDialog() {
        this.props.openNamespaceDialog()
    }

    render() {
        const { items } = this.props
        const NamespaceListImproved = this.state.namespaceListImproved

        return (
            <div className={styles.sidebar}>
                <SidebarHeader>
                    <RaisedButton
                        label="New"
                        onClick={this.showDialog.bind(this)}
                        primary
                    />
                </SidebarHeader>
                <NamespaceListImproved items={items} />
            </div>
        )
    }
}

Sidebar.propTypes = {
    getNamespaces: PropTypes.func,
    items: PropTypes.object,
    openNamespaceDialog: PropTypes.func,
}

const mapStateToProps = (state) => ({
    items: state.sidebar.namespaces,
})

const mapDispatchToProps = (dispatch) => ({
    openNamespaceDialog() {
        dispatch(openDialog(dialog.NEW_NAMESPACE))
    },
    getNamespaces() {
        dispatch(fetchNamespaces())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
