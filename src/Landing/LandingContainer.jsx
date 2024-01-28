import github from '../Assets/github-mark.png'
import ln from '../Assets/In-Blue-128.png'
import cio from '../Assets/cragglio.png'
import { SocialLinks } from './SocialLinks';

export const LandingContainer = () => {

    const links = [
        { aria: 'link to crmcleod github repositories', href: 'https://github.com/crmcleod', imgSrc: github, altText: 'github logo' },
        { aria: 'link to Craig McLeod linkedin profile', href: 'https://www.linkedin.com/in/craig-r-mcleod/', imgSrc: ln, altText: 'linkedin logo' },
        { aria: 'link to text adventure game', href: 'https://craggl.io', imgSrc: cio, altText: 'craggl.io logo' }
      ];
    
      return (
        <header>
          <h1 className='alt-font'>RockRedUgly Blog</h1>
          <div id='socials'>
            {links.map((link, index) => (
              <SocialLinks key={index} {...link} />
            ))}
          </div>
        </header>
      );
}