import React from "react";
import '../styles/articleTab.css';
import Collapsible from 'react-collapsible'; //Documentation: https://www.npmjs.com/package/react-collapsible

export default function ArticleTab() {

    return (
        <div className="article">
            <h1>Interest name here</h1>
            <p>Interest description here. deez nuts deez nuts ligma balls lololol </p>
            <p>Interest description here. deez nuts deez nuts ligma balls lololol </p>

            <p>Interest description here. deez nuts deez nuts ligma balls lololol </p>

            <p>Interest description here. deez nuts deez nuts ligma balls lololol </p>

            <p>Interest description here. deez nuts deez nuts ligma balls lololol </p>

            <p>Interest description here. deez nuts deez nuts ligma balls lololol </p>

            <p>Interest description here. deez nuts deez nuts ligma balls lololol </p>

            <p>Interest description here. deez nuts deez nuts ligma balls lololol </p>

            <p>Interest description here. deez nuts deez nuts ligma balls lololol </p>

            <p>Interest description here. deez nuts deez nuts ligma balls lololol </p>

            <p>Interest description here. deez nuts deez nuts ligma balls lololol </p>

            <p>Interest description here. deez nuts deez nuts ligma balls lololol </p>

            <p>Interest description here. deez nuts deez nuts ligma balls lololol </p>

            <p>Interest description here. deez nuts deez nuts ligma balls lololol </p>

            <p>Interest description here. deez nuts deez nuts ligma balls lololol </p>


            <p>Interest description here. deez nuts deez nuts ligma balls lololol </p>

            <p>Interest description here. deez nuts deez nuts ligma balls lololol </p>


            <div className="subArticles">
                <Collapsible trigger="Subarticle name">
                    <p>
                        This is the collapsible content. It can be any element or React
                        component you like.
                    </p>
                    <p>
                        It can even be another Collapsible component. Check out the next
                        section!
                    </p>
                </Collapsible>
                <Collapsible trigger="Subarticle name">
                    <p>
                        This is the collapsible content. It can be any element or React
                        component you like.
                    </p>
                    <p>
                        It can even be another Collapsible component. Check out the next
                        section!
                    </p>
                </Collapsible>
            </div>

        </div>
    );
}
