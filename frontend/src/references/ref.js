import { useState, useEffect } from "react";
// import Action from "./components/Action";
import axios from "axios";
import { motion } from "framer-motion/dist/framer-motion";
import Masonry from "react-masonry-css";
import { useTransform } from "framer-motion";

function App() {
    const [initialState, setInitialState] = useState([]);
    const [donnees, setDonnees] = useState(initialState);
    const [Oncechange, setOncechange] = useState(false);
    const [Category, setCategory] = useState(2);
    const [isOpen, setIsOpen] = useState(false);

    const categoryList = [
        { id: 2, nom: "Générale" },
        { id: 3, nom: "Bois" }
    ];

    //responsive ajust
    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        580: 1
    };

    useEffect(() => {
        if (Oncechange) {
            axios
                .get(
                    "https://backend.mvmaquette.com/wp-json/wp/v2/newsletter?categories=" +
                    Category
                )
                .then((response) => {
                    setDonnees(response.data[0]);
                })
                .catch((error) => {
                    console.log("Erreur de chargement APi" + error);
                })
                .then(() => {
                    setOncechange(false);
                    setIsOpen(true);
                });
        }
    }, [Oncechange, Category]);

    useEffect(() => {
        setOncechange(true);
    }, [Category]);

    const resetDonnees = () => {
        setInitialState(" ");
    };

    //const handleDelete = (id) => {
    //  const donneesCopy = [...donnees];
    //  const donneesCopyFiltred = donneesCopy.filter((donnee) => donnee.id !== id);
    //   setDonnees(donneesCopyFiltred);
    // };
    const duration = 0.5;
    const variants = {
        open: { rotateY: 0 },
        closed: { rotateY: 90 }
    };

    function Tuile(props) {
        let contenu = "";
        let alea = Math.floor(Math.random() * (2 - 1 + 1) + 1);
        if (alea === 1) {
            alea = 0.4;
        } else {
            alea = 0;
        }
        if (typeof donnees.acf !== "undefined") {
            // il y a des données
            // on récupère le contenu
            contenu = Object.values(donnees.acf)[props.index];
            let size = contenu.length;

            //non vide, construit la tuile
            if (size > 0)
                return (
                    <div className="item">
                        <motion.div
                            initial={{ rotateY: isOpen ? 90 : 0 }}
                            animate={isOpen ? "open" : "closed"}
                            variants={variants}
                            transition={{
                                rotateY: {
                                    duration: duration,
                                    delay: alea,
                                    ease: "easeInOut"
                                },
                                default: { ease: "easeInOut" }
                            }}
                            className={"card cat-" + Category + " tuile_" + [props.index]}
                        >
                            <div dangerouslySetInnerHTML={{ __html: contenu }}></div>
                        </motion.div>
                    </div>
                );
        } else {
            return false;
        }
    }

    function changeCategory(cat_id) {
        //si catégorie différente et pas en cours de changement
        console.log("cat: " + Category);
        console.log("is:" + isOpen);

        if (cat_id !== Category && isOpen === true) {
            setIsOpen(false);
            setTimeout(() => {
                setDonnees(false);
                setCategory(cat_id);
            }, 900);
        } else if (isOpen === false) {
            setOncechange(true);
        }
    }
    useEffect(() => { }, [Category]);

    return (
        <div className="content visible">
            <div>
                <h1>Newsletter avec React et api wordpress</h1>
                <p>
                    Remonte les posts en fonction de la catégorie.
                    <a href="https://backend.mvmaquette.com/"> Lien vers le backoffice</a>
                </p>

                <div className={"menu-cat"}>
                    {categoryList.map((donnee) => (
                        <div
                            key={donnee.id}
                            className={Category === donnee.id ? "active_cat" : null}
                        >
                            <motion.button
                                onTap={(event) => changeCategory(donnee.id)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={"btn-cat cat-color-" + donnee.id}
                            >
                                <label className={"label-cat" + donnee.id}>
                                    <img
                                        className="picto-cat"
                                        src={
                                            "https://backend.mvmaquette.com/wp-content/uploads/cat" +
                                            donnee.id +
                                            ".png"
                                        }
                                        alt=""
                                    />
                                    <div className="label-cat">
                                        {Category === donnee.id && donnee.nom}{" "}
                                    </div>
                                </label>
                            </motion.button>
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <br />

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                <Tuile index="0" />
                <Tuile index="1" />
                <Tuile index="2" />
                <Tuile index="3" />
                <Tuile index="4" />
                <Tuile index="5" />
                <Tuile index="6" />
                <Tuile index="7" />
                <Tuile index="8" />
                <Tuile index="9" />
                <Tuile index="10" />
                <Tuile index="11" />
            </Masonry>
        </div>
    );
}

export default App;
