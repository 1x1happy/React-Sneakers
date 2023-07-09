import ContentLoader from "react-content-loader";
import React from "react";
import styles from './Loading.module.scss'

const Loading = () =>{
    return (
        <div className={styles.Loading}>
            <ContentLoader
                speed={2}
                width={155}
                height={265}
                viewBox="0 0 155 265"
                backgroundColor="#e3e3e3"
                foregroundColor="#fafafa"
            >
                <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
                <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
            </ContentLoader>
        </div>

    )
}

export default Loading