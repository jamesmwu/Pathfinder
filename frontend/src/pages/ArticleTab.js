import React, { useState, useEffect } from "react";
import '../styles/articleTab.css';
import Collapsible from 'react-collapsible';
import axios from 'axios';

function ArticleTab() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/articles/all`)
            .then(response => {
                setArticles(response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div>
            {articles.map(article => (
                <div key={article._id} className="article">
                    <h1>{article.title}</h1>
                    <h4 style={{ "marginTop": "0" }}>By {article.author}</h4>
                    <br />
                    {article.bodyText.map((body, index) => (
                        <div key={index}>
                            {body.type === 'subheading' ?
                                (<div>
                                    <h3>{body.text}</h3>
                                    <br />
                                </div>)
                                : body.type === 'bodytext' ?
                                    (<div>
                                        <p>{body.text}</p>
                                        <br />
                                    </div>)
                                    : body.type === 'ulist' ?
                                        (
                                            <ul>
                                                {body.list.map((item, itemIndex) => (
                                                    <li key={itemIndex}>{item}</li>
                                                ))}
                                            </ul>
                                        )
                                        : body.type === 'olist' ?
                                            (
                                                <ol>
                                                    {body.list.map((item, itemIndex) => (
                                                        <li key={itemIndex}>{item}</li>
                                                    ))}
                                                </ol>
                                            ) : null
                            }
                        </div>
                    ))}
                    <div className="subArticles" >
                        {article.subArticles.map((subArticle, index) => (
                            <Collapsible trigger={subArticle.title} key={index}>
                                {subArticle.body.map((subBody, subIndex) => (
                                    <div key={subIndex}>
                                        {subBody.type === 'subheading' ?
                                            (<div>
                                                <h3>{subBody.text}</h3>
                                                <br />
                                            </div>)
                                            : subBody.type === 'bodytext' ?
                                                (<div>
                                                    <p>{subBody.text}</p>
                                                    <br />
                                                </div>)
                                                : subBody.type === 'ulist' ?
                                                    (
                                                        <ul>
                                                            {subBody.list.map((item, itemIndex) => (
                                                                <li key={itemIndex}>{item}</li>
                                                            ))}
                                                        </ul>
                                                    )
                                                    : subBody.type === 'olist' ?
                                                        (
                                                            <ol>
                                                                {subBody.list.map((item, itemIndex) => (
                                                                    <li key={itemIndex}>{item}</li>
                                                                ))}
                                                            </ol>
                                                        ) : null
                                        }
                                    </div>
                                ))}
                            </Collapsible>
                        ))}
                    </div>

                </div>
            ))}
        </div>
    );
}

export default React.memo(ArticleTab);
