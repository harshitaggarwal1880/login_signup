import React from "react";
import { styled } from "styled-components";

const Loading = () => {
  return (
    <LoadingStyle>
      <div class="content">
        <div class="ball red"></div>
        <div class="ball green"></div>
        <div class="ball yellow"></div>
        <div class="ball blue"></div>
        <div class="ball emerald-green"></div>
        <div class="ball pink"></div>
      </div>
    </LoadingStyle>
  );
};

const LoadingStyle = styled.div`
  .content {
    width: 80px;
    height: 80px;
    margin: 100px auto;
    border-radius: 50%;
    border: solid 1px rgb(248, 246, 236);
    position: relative;
    animation-name: yahoo-spin-animation;
    animation-duration: 1.5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  @keyframes yahoo-spin-animation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .ball {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
  }

  /**
   * Each Color Info 
   */
  .red {
    border: 1px solid rgb(238, 92, 47);
    background: rgb(238, 87, 48);
    top: -10px;
    left: 50%;
    margin-left: -10px;
  }

  .green {
    border: 1px solid rgb(84, 174, 10);
    background: rgb(85, 178, 17);
    top: 10px;
    right: -6px;
  }

  .yellow {
    border: 1px solid rgb(247, 184, 50);
    background: rgb(238, 187, 48);
    bottom: 10px;
    right: -6px;
  }

  .blue {
    border: 1px solid rgb(43, 151, 251);
    background: rgb(48, 161, 251);
    bottom: -10px;
    left: 50%;
    margin-left: -10px;
  }

  .emerald-green {
    border: 1px solid rgb(74, 167, 130);
    background: rgb(74, 168, 139);
    bottom: 10px;
    left: -6px;
  }

  .pink {
    border: 1px solid rgb(236, 79, 147);
    background: rgb(237, 76, 148);
    top: 10px;
    left: -6px;
  }
`;

export default Loading;
