import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useState } from "react";
import { USERS } from "../../api/api";
import DetailsProfile from "../../pages/Home/ItemVideo/DetailsProfile/DetailsProfile";
import styles from "../../pages/Home/ItemVideo/ItemVideo.module.scss";
import { ConnectApi } from "../GlobalFunc/GlobalFunc";

const cx = classNames.bind(styles);


export default function Tippys({ children, setFollow, data, unoffset }: any) {
    const [datadetails, setDatadetails] = useState<any | undefined>();

    return (
        <Tippy
            interactive
            zIndex={1}
            appendTo={document.body}
            delay={[200, 700]}
            offset={unoffset ? [0, 0] : [130, 6]}
            placement='bottom'
            hideOnClick={false}
            onShow={() => {
                ConnectApi(USERS, "POST", data.username ? { username: data.username } : { username: data })
                    .then((req) => setDatadetails(req))
                    .catch((res) => console.log(res))

            }}
            onHide={() => {
                setDatadetails('')
            }}
            render={(attrs) => datadetails && (
                <div className={cx('search-result')} tabIndex={-1} {...attrs}>
                    {<DetailsProfile
                        datadetails={datadetails?.data[0] ? datadetails.data[0] : datadetails.data}
                        setFollow={setFollow} />}
                </div>
            )}>
            {children}
        </Tippy>
    )
}