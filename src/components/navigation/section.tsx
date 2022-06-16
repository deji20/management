import React from 'react';
import { Link } from 'react-router-dom';
import './section.css';

interface SectionProps{
    href: string;
    title: string;
}

function Section(props: SectionProps) {
    return (
        <Link to={props.href}>
            <div className="Section">
                <div className="Section-Title">
                        <h2>{props.title}</h2>
                </div>
            </div>
        </Link>
      );
}

export default Section;
