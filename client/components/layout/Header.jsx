/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { client } from '../../lib/sanity';
import { connectWallet } from '../../utils/web3/authHandler';

import { Button } from '../style';

const Header = ({ addressConnected, setAddressConnected }) => {
  const [toggle, setToggle] = useState(false);
  const [width, setWidth] = useState(0);
  const [sticky, setSticky] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState();

  useEffect(() => {
    setWidth(window.innerWidth);
    const init = async () => {
      if (addressConnected) {
        const otaku = await client.fetch(`*[_type == "users" && address match "${addressConnected.toLowerCase()}"][0]{
          avatarUrl
        }`);

        setAvatarUrl(otaku);
      }
      document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('save-profil')) {
          if (addressConnected) {


            const otaku =
              await client.fetch(`*[_type == "users" && address match "${addressConnected.toLowerCase()}"][0]{
              avatarUrl
            }`);

            setAvatarUrl(otaku);
          }
        }
      });
    };
    init();

    const headerObserver = new IntersectionObserver(handleSticky, {
      root: null,
      threshold: 0.9,
    });

    if (document.querySelector('#banner')) {
      headerObserver.observe(document.querySelector('#banner'));
    } else {
      setSticky(true);
    }
    if (toggle) {
      window.addEventListener('click', (e) => {
        
        if (e.target !== document.querySelector('.button-sort')) {
          setToggle(false);
        }
      });
    }
    window.addEventListener('resize', handleWidth);
    return () => {
      window.removeEventListener('click', null);
      window.removeEventListener('resize', handleWidth);
    };
  }, [addressConnected, sticky, toggle, setAvatarUrl]);

  // Handle Function Toggle
  const handleWidth = () => setWidth(window.innerWidth);
  const handleToggle = (e) => {
    e.stopPropagation();
    setToggle(!toggle);
  };
  // Handle Observer
  function handleSticky(entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) setSticky(true);
    else setSticky(false);
  }

  const stickyStyle = `
  background-color: var(--body-color);
  box-shadow: 0 1px 4px hsla(0, 4%, 15%, .1);

  nav>a, .bx-grid-alt{
    color: var(--title-color) !important;
  }
  @media screen and (min-width: 810px) {
    ul a {
      color: var(--dark-color) !important;
    }
    ul a::after{
      background-color: var(--dark-color) !important;
    }
  }
`;

  return (
    <Container sticky={sticky} stickyStyle={stickyStyle}>
      <Nav>
        <Link href={'/'}>
          <a>
            NFT <span>Set</span>
          </a>
        </Link>

        <Menu toggle={toggle} id="menu">
          <ul>
            <li className="nav__item">
              <Link href="/explore">Explore</Link>
            </li>
            <li className="nav__item">
              <Link href="/team">Our Team</Link>
            </li>
            <li className="nav__item">
              {addressConnected ? (
                <Link href={`/sensei/me/${addressConnected}`} passHref>
                  <img
                    src={avatarUrl && avatarUrl.avatarUrl && avatarUrl.avatarUrl.startsWith('https')  ? avatarUrl.avatarUrl : 'https://nftavatarmaker.com/assets/main-nft.png'}
                    alt={`otaku-${addressConnected}`}
                  />
                </Link>
              ) : (
                <Button onClick={() => connectWallet(setAddressConnected)}>
                  <Wallet>
                    <i className="bx bxs-wallet-alt" />
                    Connect
                  </Wallet>
                </Button>
              )}
            </li>
          </ul>
        </Menu>
        {width < 810 && (
          <Toggle className='button-sort' onClick={handleToggle}>
            <i className={toggle ? 'bx bx-x' : 'bx bx-grid-alt '}></i>
          </Toggle>
        )}
      </Nav>
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-fixed);
  ${({ sticky, stickyStyle }) => sticky && stickyStyle}
`;

const Nav = styled.nav`
  width: 100%;
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1.5rem;

  // Logo
  & > a {
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    font-weight: var(--font-bold);
    color: var(--text-color-light);

    span {
      color: var(--first-color);
    }
  }

  @media screen and (min-width: 810px) {
    height: calc(var(--header-height) + 1.5rem);
    justify-content: space-between;

    padding-inline: 2.5rem;
  }
`;

const Menu = styled.div`
  ul {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    row-gap: 3rem;
    padding-top: 9rem;

    a {
      text-transform: uppercase;
      // color: #fdd974;
      color: var(--body-color);
      font-size: var(--h2-font-size);
      transition: 0.3s;

      &:hover {
        color: rgba(255, 255, 255, 0.8);
      }
    }

    img {
      position: absolute;
      top: 4rem;
      right: 5rem;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 3px solid var(--body-color);
      cursor: pointer;
      object-fit: cover;

      &:hover {
        transform: scale(1.05);
        filter: brightness(1.3);
      }
    }
  }

  @media screen and (max-width: 810px) {
    position: fixed;
    background: linear-gradient(160deg, #142b4f -4%, #041e46 46%);
    top: 0;
    right: ${({ toggle }) => (toggle ? css`0` : css`-100%`)};
    width: 100%;
    height: 100%;
    transition: 0.3s;
  }

  @media screen and (min-width: 810px) {
    ul {
      padding-top: 0;
      flex-direction: row;
      column-gap: 4rem;

      a {
        position: relative;
        font-size: var(--normal-font-size);
        text-transform: initial;

        &::after {
          content: '';
          position: absolute;
          width: 1px;
          height: 12px;
          background-color: var(--body-color);
          transform: translateX(1.25rem);
          top: 0;
          bottom: 0;
          margin: auto 0;
        }
      }

      img {
        position: static;
        border-color: var(--dark-color);
        width: 40px;
      }
    }
  }
`;

const Wallet = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  i {
    font-size: var(--normal-font-size);
  }
`;

const Toggle = styled.div`
  display: inline-flex;
  font-size: 1.35rem;
  color: var(--text-color-light);
  cursor: pointer;
  z-index: var(--z-tooltip);
`;

export default Header;
