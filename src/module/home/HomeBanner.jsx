import React from "react";
import styled from "styled-components";
import Button from "../../components/button/Button";

const HomeBannerStyles = styled.div`
  min-height: 520px;
  padding: 40px 0;
  margin-bottom: 60px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .banner-content {
    max-width: 600px;
    color: white;
  }
  .banner-heading {
    font-size: 36px;
    margin-bottom: 20px;
  }
  .banner-desc {
    line-height: 1.75;
    margin-bottom: 40px;
  }
`;
const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Monkey Blogging</h1>
            <p className="banner-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              optio natus tempora, deserunt velit eveniet repellendus,
              accusantium, dolorum earum quis aliquid eos nesciunt voluptate et
              praesentium saepe aperiam officia illo?
            </p>
            <Button to="/sign-up" bg="secondary">
              Get started
            </Button>
          </div>
          <div className="banner-image">
            <img src="/images/img-banner.png" alt="banner" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
