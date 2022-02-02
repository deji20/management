import React from 'react';
import { Link } from 'react-router-dom';
import './section.css';

interface SectionProps{
    href: string;
    title: string;
}

function Section(props: SectionProps) {
    return (
        <div className="Section">
            <div className="Section-Title">
                <Link to={props.href}>
                    <h2>{props.title}</h2>
                </Link>
            </div>
        </div>
      );
}

export default Section;
