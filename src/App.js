import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      isStart: true,
      startX: null,
      startY: null,
      startTime: null
    }
  }

  componentDidMount() {
    this.randomNumber();
    window.addEventListener('keydown', (e) => {
      this.slozhenie(e);
    })
  }

  randomNumber = () => {
    let newArray = this.state.array.slice();
    let randomNum = Math.ceil(16 * Math.random()-1);
    let flag = 0;
    for (let i=0; i<16; i++) {
      if (randomNum + i < 16) {
        if (newArray[randomNum + i] === 0) {
          newArray[randomNum + i] = 2;
          flag = 1;
        }
      } else {
        if (newArray[randomNum + i -16] === 0) {
          newArray[randomNum + i - 16] = 2;
          flag = 1;
        }
      }
      if (flag === 1) {
        i=16;
      }
    }
    this.setState({array: newArray});
  }

  slozhenie = e => {
    let newArray = this.state.array.slice();
    if(e.key === 'ArrowLeft') {
      for (let i=0; i<newArray.length; i++) {
        if (newArray[i] !== 0) {
          let zeloe = Math.floor(i/4);
          for (let j=zeloe*4; j<zeloe*4+4; j++) {
            if (newArray[j] === 0 && j < i) {
              newArray[j] = newArray[i];
              newArray[i] = 0;
              break;
            }
          }
        }
      }
      for (let i=0; i<newArray.length; i++) {
        if (newArray[i] !== 0) {
          let zeloe = Math.floor(i/4);
          for (let j=i+1; j<zeloe*4+4; j++) {
            if (newArray[j] === newArray[i] && j === i+1) {
              newArray[i] = newArray[i]*2;
              newArray[j] = newArray[j+1];
              for (let k=j; k<zeloe*4+4; k++) {
                if (k === zeloe*4+3) {
                  newArray[k]=0;
                } else {
                  newArray[k]=newArray[k+1];
                }
              }
            }
          }
        }
      }
      if (JSON.stringify(newArray) !== JSON.stringify(this.state.array)) {
        this.setState({array: newArray}, () => {
            this.randomNumber();
        });
      }
    }

    if(e.key === 'ArrowRight') {
      for (let i=newArray.length-1; i!==-1; i--) {
        if (newArray[i] !== 0) {
          let zeloe = Math.floor(i/4);
          for (let j=zeloe*4+3; j !== zeloe*4-1; j--) {
            if (newArray[j] === 0 && j > i) {
              newArray[j] = newArray[i];
              newArray[i] = 0;
              break;
            }
          }
        }
      }
      for (let i=newArray.length-1; i>=0; i--) {
        if (newArray[i] !== 0) {
          let zeloe = Math.floor(i/4);
          for (let j=i-1; j>=zeloe*4; j--) {
            if (newArray[j] === newArray[i] && j === i-1) {
              newArray[i] = newArray[i]*2;
              newArray[j] = newArray[j-1];
              for (let k=j; k>=zeloe*4; k--) {
                if (k === zeloe*4) {
                  newArray[k]=0;
                } else {
                  newArray[k]=newArray[k-1];
                }
              }
            }
          }
        }
      }
      if (JSON.stringify(newArray) !== JSON.stringify(this.state.array)) {
        this.setState({array: newArray}, () => {
            this.randomNumber();
        });
      }
    }

    if (e.key === 'ArrowUp') {
      for (let i=0; i<4; i++) {
        for (let j=i; j<i+9; j=j+4) {
          if (newArray[j] === 0) {
            for (let k=j+4; k<i+13; k=k+4) {
              if (newArray[k] !== 0) {
                newArray[j] = newArray[k];
                newArray[k] = 0;
                j=j+4;
              }
            }
          }
        }
      }
      for (let i=0; i<4; i++) {
        if (newArray[i] !== 0) {
          for (let j=i; j<i+9; j=j+4) {
            for (let k=j+4; k<i+13; k=k+4) {
              if (newArray[j] === newArray[k] && k==j+4) {
                newArray[j] = newArray[j]*2;
                for (let m=k; m<i+13; m=m+4) {
                  if (m!==i+12) {
                    newArray[m]=newArray[m+4];
                  } else {
                    newArray[m]=0;
                  }
                }
              }
            }
          }
        }
      }
      if (JSON.stringify(newArray) !== JSON.stringify(this.state.array)) {
        this.setState({array: newArray}, () => {
            this.randomNumber();
        });
      }
    }

    if(e.key === 'ArrowDown') {
      for (let i = 15; i !== 11; i--) {
        for (let j=i; j>=i%4+4; j=j-4) {
          if (newArray[j] === 0) {
            for (let k=j-4; k>=i%4; k=k-4) {
              if (newArray[k] !== 0) {
                newArray[j] = newArray[k];
                newArray[k] = 0;
                j=j-4;
              }
            }
          }
        }
      }
      for (let i=15; i !== 11; i--) {
        if (newArray[i] !== 0) {
          for (let j=i; j>=i%4+4; j=j-4) {
            for (let k=j-4; k>=i%4; k=k-4) {
              if (newArray[j] === newArray[k] && k==j-4) {
                newArray[j] = newArray[j]*2;
                for (let m=k; m>=i%4; m=m-4) {
                  if (m!==i%4) {
                    newArray[m]=newArray[m-4];
                  } else {
                    newArray[m]=0;
                  }
                }
              }
            }
          }
        }
      }
      if (JSON.stringify(newArray) !== JSON.stringify(this.state.array)) {
        this.setState({array: newArray}, () => {
            this.randomNumber();
        });
      }
    }
  }

  onTouchStart = e => {
    const obj = e.changedTouches[0];
    this.setState({startX: obj.pageX, startY: obj.pageY, startTime: new Date().getTime()});
  };

  onTouchEnd = e => {
    const touchobj = e.changedTouches[0];
    const dist = touchobj.pageX - this.state.startX;
    const distY = touchobj.pageY - this.state.startY;
    const elapsedTime = new Date().getTime() - this.state.startTime;
    const swiper = (elapsedTime <= 400 && Math.abs(dist) >= 50 && Math.abs(touchobj.pageY - this.state.startY) <= 300);
    const swiperY = (elapsedTime <= 400 && Math.abs(distY) >= 50 && Math.abs(touchobj.pageX - this.state.startX) <= 300);
    if (swiper && dist > 0) {
      this.slozhenie({key: 'ArrowRight'})
    }
    if (swiper && dist < 0) {
      this.slozhenie({key: 'ArrowLeft'})
    }
    if (swiperY && distY > 0) {
      this.slozhenie({key: 'ArrowDown'})
    }
    if (swiperY && distY < 0) {
      this.slozhenie({key: 'ArrowUp'})
    }
  };

  render() {
    const content = this.state.array.map((item, key) => (
      <div className={(item !== 0 ? `color_${item}` : '') + ' sqarik'} key={key}>
      { item !== 0 && item }
      </div>
    ))
    return (
      <div className='square' onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
        {content}
      </div>
    )
  }
}

export default App;
