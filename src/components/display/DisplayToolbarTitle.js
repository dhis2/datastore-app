import BreadcrumbHistoryButton from 'components/utils/BreadcrumbHistoryButton'
import styles from 'DisplayToolbarTitle.module.css'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import React, { PropTypes, Component } from 'react'
import Theme from '../../utils/theme'

class DisplayToolbarTitle extends Component {
    renderPath(path) {
        const chevStyle = {
            fill: Theme.palette.primary1Color,
            padding: '0 16px 0 16px',
            verticalAlign: 'middle',
        }

        const pathArray = path.split('/')
        const length = pathArray.length - 1
        return (
            <span className={styles.toolbarTitle}>
                {pathArray.map((item, index) => (
                    <span key={index}>
                        <BreadcrumbHistoryButton label={item} key={index} />
                        {index === length ? null : (
                            <ChevronRight style={chevStyle} />
                        )}
                    </span>
                ))}
            </span>
        )
    }

    renderDefault() {
        return <span className={styles.toolbarTitle}>Value</span>
    }

    render() {
        const { path } = this.props

        if (path) {
            return this.renderPath(path)
        }

        return this.renderDefault()
    }
}

DisplayToolbarTitle.propTypes = {
    path: PropTypes.string,
}

export default DisplayToolbarTitle
