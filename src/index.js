import React from 'react';
import { render } from 'react-dom';
import App from './app';
import startMirage from '../bigtest/network';

if (process.env.MIRAGE_SCENARIO) {
  startMirage(process.env.MIRAGE_SCENARIO.split(','));
}

render(<App/> , document.getElementById('app'));