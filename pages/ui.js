import React from 'react'
export default () => {
  return (
    <div className="dream-show">
      <header>
        <a href="/" className="icon-back"></a>
        <span className="page-title">Dreams</span>
      </header>
      <div className="page-cover"></div>
      <div className="detail">
        <div className="meta">
          <span className="dreamer">Weiting</span>
          <span className="created-at">Sep 12, 2018 22:10:08</span>
        </div>
        <h1>Fastest watermelon eater in Codementor</h1>
        <div className="finished-at">Ending in 7 minutes</div>
        <div className="state-action">
          <div className="info">
            <div className="item">
              <span className="label">Stake</span>
              <span className="value">$100</span>
            </div>
            <div className="item">
              <span className="label">Bet pool</span>
              <span className="value">$1,630</span>
            </div>
            <div className="item">
              <span className="label">You win</span>
              <span className="value">$0</span>
            </div>
          </div>
          <div className="bet">
            <form>
              <input type="text" placeholder="Amount you want to bet"></input>
              <div className="btns">
                <button>YES</button>
                <button>NO</button>
              </div>
            </form>
          </div>
        </div>
        <label className="investors">Investors</label>
        <div className="bettrs">
          <div className="bettr">
            <div className="bet-info">
              <div className="bet-what">YES</div>
              <div className="nickname">gage@codementor.io</div>
            </div>
            <div className="bet-amount">$300</div>
          </div>
          <div className="bettr">
            <div className="bet-info">
              <div className="bet-what">NO</div>
              <div className="nickname">ian@codementor.io</div>
            </div>
            <div className="bet-amount">$100</div>
          </div>
        </div>
      </div>
      

      <style jsx>{`
        .bet-info .nickname{
          font-size: 12px;
          color: #B0B0B0;
          margin: 5px 0 20px;
        }
        .bettrs{
          
        }
        .bettr{
          margin-top: 20px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        label.investors{
          margin-top: 20px;
          color: #FFFFFF;
          font-size: 12px;
        }
        .btns{
          flex: 1;
          width: 115px;
        }
        .state-action button{
          width: 50px;
          height: 34px;
          box-sizing: border-box;
          border-radius: 3px;
          background: #FFE018;
          border: 0px;
          margin-left: 7px;
        }
        .state-action .bet form{
          display: flex;
          align-items: center;
        } 
        .state-action .bet{
          margin-top: 15px;
        }

        .state-action .bet input{
          border: 1px solid #E0E0E0;
          border-radius: 2px;
          padding: 5px 10px;
          box-sizing: border-box;
          font-size: 14px;
          height: 34px;
          margin-right: 5px;
          width: calc(100% - 120px);;
        }
        .state-action .info .item .value{
          color: #010311;
          display: block;
          font-size: 16px;
        }
        .state-action .info .item .label{
          color: #F07062;
          display: block;
          margin-bottom: 10px;
          font-size: 14px;
        }
        
        .state-action .info{
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .state-action{
          padding: 13px 18px;
          background: #fff;
          border-radius: 3px;
          width: 100%;
          margin: 22px 0 15px;
          box-sizing: border-box;
        }
        .finished-at{
          color: #FAFAFA;
          font-size: 12px;
        }
        .detail{
          padding: 15px 20px;
        }
        .meta{
          height: 26px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #B0B0B0;
          font-size: 12px;
        }
        .detail h1{
          color: #fff;
          margin: 10px 0 7px 0;
          line-height: 1.3;
          font-size: 30px;
        }
        :global(body) {
          background: #010311;
          font-family: 'Comfortaa', cursive;
          margin: 0px;
          padding: 0px;
        }
        header{
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: left;
          box-sizing: border-box;
          padding: 9px 5px;
        }
        .icon-back{
          background: url('/static/back.png') no-repeat 50% 50%;
          width: 30px;
          height: 30px;
          display: inline-block;
        }
        .page-title{
          display: inline-block;
          line-height: 36px;
          margin-top: 4px;
          color: #fff;
        }
        .page-cover{
          background-image: url('https://swampscottfarmersmarketblog.files.wordpress.com/2014/07/sfm_watermeloneating2014.jpg');
          background-repeat: no-repeat;
          background-size: cover;
          width: 100%;
          height: 200px;
        }
      `}</style>
    </div>
  )
}
