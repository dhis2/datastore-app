import { PropTypes } from '@dhis2/prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNamespaces } from '../../actions'
import { openDialog } from '../../actions/dialogActions'
import * as dialog from '../../constants/dialogTypes'
import SidebarAreaHOC from '../hoc/SidebarAreaHOC'
import NamespaceList from './NamespaceList'
import styles from './Sidebar.module.css'
import SidebarHeader from './SidebarHeader'

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
