import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../assets/tari-block-explorer.svg';
import { connect } from 'react-redux';
import './TopBar.scss';
import TopBarItem from './TopBarItem';
import TopBarSearch from './TopBarSearch';
import { ChainMetadata } from '../helpers/api';
import { Link } from 'react-router-dom';

function TopBar({ metadata }: { metadata: ChainMetadata }) {
    const [blockHeight, setBlockHeight] = useState('...');
    const [totalTransactions, setTotalTransactions] = useState('...');
    const [averageTxPerSecond, setAverageTxPerSecond] = useState('...');
    const [hashRate, setHashRate] = useState('...');
    const [averageFee, setAverageFee] = useState('...');
    const [averageBlockTime, setAverageBlockTime] = useState('...');

    useEffect(() => {
        const formattedBlockHeight = numeral(metadata.blockHeight).format('0,0');
        setBlockHeight(formattedBlockHeight);

        const formattedTotalTransactions = numeral(metadata.totalTransactions).format('0,0');
        setTotalTransactions(formattedTotalTransactions);

        const formattedCalcAverageTxPerSecond = numeral(metadata.averageTxPerSecond).format('0.0');
        setAverageTxPerSecond(formattedCalcAverageTxPerSecond);

        const formattedHashRate = numeral(metadata.averageDifficulty?.estimatedHashRate).format('0.0 a') + 'H';
        setHashRate(formattedHashRate);

        const formattedAverageFee = numeral(metadata.averageFee).format('0,0');
        setAverageFee(formattedAverageFee);

        const formattedAverageBlockTime = numeral(metadata.averageBlockTimes).format('0') + 's';
        setAverageBlockTime(formattedAverageBlockTime);
    }, [metadata]);

    return (
        <div className="TopBar">
            <div className="TopBar-first max-container-head">
                <div className="TopBar-logoContainer">
                    <Link to="/">
                        <Logo />
                    </Link>
                    <a href="https://tari.com" target="_blank" rel="noopener noreferrer" className="simpleBtn mobile">
                        <p>Visit Tari.com</p>
                    </a>
                </div>
                <div className="TopBar-searchContainer">
                    <div className="TopBar-itemContainer">
                        <TopBarItem label="Total Txns" value={totalTransactions} />
                        <TopBarItem label="Avg Txns / Sec" value={averageTxPerSecond} />
                        <TopBarItem label="Hash Rate" value={hashRate} />
                        <TopBarItem label="Avg Fee" value={averageFee} />
                        <TopBarItem lowerCase={true} label="Avg Block Time" value={averageBlockTime} />
                        <TopBarItem label="Block Height" value={blockHeight} />
                    </div>
                </div>
            </div>
            <div className="SearchBar-bg">
                <div className="TopBar-second max-container-head">
                    <TopBarSearch />
                    <a href="https://tari.com" target="_blank" rel="noopener noreferrer" className="simpleBtn desktop">
                        <p>Visit Tari.com</p>
                    </a>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    metadata: state.metadata
});
export default connect(mapStateToProps)(TopBar);
