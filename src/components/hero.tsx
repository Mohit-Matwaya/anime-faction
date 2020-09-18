import React from "react";
import styled from "styled-components";

export default () => {
    return (
        <Container>
            <Hero>
                <h1>
                    Anime
                    <br />
                    Faction
                </h1>
                <Quote>
                    "In this world, wherever there is light - there are
                    also shadows. As long as the concept of winners exists,
                    there must also be losers. The selfish desire of
                    wanting to maintain peace causes wars, and hatred is
                    born to <span>protect love.</span>"
                </Quote>
                <A
                    href="//www.instagram.com/anime._.faction/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Instagram page <span>➜</span>
                </A>
            </Hero>
        </Container>
    );
};

const Container = styled.div`
    height: 75vh;
    background-image: url("/assets/hero-bg.jpg");
    background-position: top left;
    background-attachment: fixed;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
`;

const Hero = styled.div`
    margin-left: 10vw;
    padding-top: 64px;
    width: 40vw;
    height: calc(100% - 64px);
    color: #ece1dd;
    h1 {
        margin-bottom: 12px;
        text-align: left;
        font-size: 48px;
        line-height: 1.5;
    }
`;

const Quote = styled.p`
    margin-bottom: 32px;
    line-height: 1.7;
    span {
        font-weight: 700;
        color: #3c2128;
    }
`;

const A = styled.a`
    display: inline-block;
    padding: 12px 24px;
    border: 1px solid currentColor;
    border-radius: 32px;
    color: inherit;
    span {
        display: inline-block;
        transition: transform 0.2s ease-in-out;
    }
    &:hover span {
        transform: rotate(-405deg);
    }
`;
