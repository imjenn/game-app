import React, {useEffect, useState} from "react";
import styles from "./Dropdown.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong, faClipboardList} from '@fortawesome/free-solid-svg-icons';

const Dropdown = (props) => {
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState(false);
    const [sortOption, setSortOption] = useState("")
    const [sortOptionValue, setSortOptionValue] = useState("Sort Randomize");
    const [genre, setGenre] = useState();
    const [studio, setStudio] = useState();
    const [pagination, setPagination] = useState('multiple');
    const toggle = () => setOpen(!open);

    const handleButtonAction = () =>{
        props.setPagination(pagination);
        props.handleClose();
    }

    useEffect( () =>{
        if (sortOption === 'alphabet'){
            //use props
            setSortOptionValue("A to Z")
        }else if(sortOption === 'page'){
            //use props
            setSortOptionValue("1 2 3.... n.,")
        }else {
            setSortOptionValue("Sort Randomize")
        }

    }, [sortOption])


    return (
        <div>
            <div className={styles.containerDropdown}>
                <div className={styles.advanceSearchTitle}>
                    <h5 className={styles.h4SeachTitle}><FontAwesomeIcon className={styles.fontAwsome} icon={faClipboardList}/> Filter Search</h5>
                </div>
                <div className={styles.defaultOption}>
                    <input type="checkbox" name="checkbox" id="checkbox1"/>
                    <label htmlFor="checkbox1">Default Search</label>
                </div>

                <div className={styles.selectFields}>
                    <div className={styles.selectFieldsOption}>
                        <div className={styles.dropDownItems}>
                            <p className={styles.pSelectFields}>Select Fields</p>
                            <select className={styles.customSelect}>
                                <option value="title">Pagination</option>
                            </select>

                            <select className={styles.customSelect}>
                                <option value="title">Genre</option>
                            </select>


                            <select className={styles.customSelect}>
                                <option value="title">Studio</option>
                            </select>
                        </div>

                        <div className={styles.dropDownItems}>
                            <p className={styles.pSelectFields}>Select Option:</p>
                            <select className={styles.customSelect} onChange={(e) => {setPagination(e.target.value);}}>
                                <option value="multiple">Multiple Page</option>
                                <option value="single">Single Pages</option>
                            </select>

                            <select className={styles.customSelect} onChange={(e) => {setGenre(e.target.value);}}>
                                <option value="title">All</option>
                                {props.games ? props.games.map((games, idx) => {
                                    return (
                                        <option key={idx}>{games.genre}</option>
                                    )
                                }) : null}
                            </select>

                            <select className={styles.customSelect} onChange={(e) => {setStudio(e.target.value);}}>
                                <option value="title">All</option>
                                {props.games ? props.games.map((games, idx) => {
                                    return (
                                        <option key={idx}>{games.studio}</option>
                                    )
                                }) : null}
                            </select>
                        </div>
                    </div>
                </div>

                <div className={styles.selectFields}>
                    <p>Select Sort Option</p>
                    <div className={styles.sortOption}>
                        <select className={styles.customSelect} onChange={(e) => {setSortOption(e.target.value);}}>
                            <option value="title">Any</option>
                            <option value="alphabet">Alphabet</option>
                            <option value="page">Page</option>
                        </select>

                        <FontAwesomeIcon className={styles.fontAwsomeArrow} icon={faArrowRightLong}/>
                        <div className={styles.sortOptionP}>
                            <p className={styles.sortOptionPtext}>{sortOptionValue}</p>
                        </div>
                    </div>

                    <div className={styles.sortOption}>
                        <div className={styles.sortOptionP}>
                            <p className={styles.sortOptionPtext}>{sortOption}</p>
                        </div>

                        <FontAwesomeIcon className={styles.fontAwsomeArrow} icon={faArrowRightLong}/>
                        <select className={styles.customSelect}>
                            <option value="title">Any</option>
                            <option value="alphabet">A to Z</option>
                            <option value="page">Z to A</option>
                        </select>

                    </div>

                </div>

                <div className={styles.ButtonFieldBox}>
                    <input type={'button'}  onClick={props.handleClose} className={styles.selectFieldButtons} value="Close" />
                    <input type={'button'}  className={styles.selectFieldButtons} value="Apply" onClick={handleButtonAction}/>
                </div>

            </div>

        </div>
    );
}

export default Dropdown;