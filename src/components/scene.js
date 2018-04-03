// @flow
import * as React from 'karet';
import * as U from 'karet.util';
import * as L from 'partial.lenses';
import type { ComponentType } from 'react';
import type { Scene as SceneT } from '../types/models';

interface Props {
  scene: SceneT;
  sceneAspect: *;
}

const sourcesIn = U.view(['sources', L.define([])]);
const nameIn = U.view('name');
const resolutionIn = U.compose(U.view(L.first), sourcesIn);
const aspectRatioFor = U.view([L.log(), L.props('cx', 'cy'), L.log(),
                               L.normalize(({ cx, cy }) => cy / cx)]);

const getSceneAR = U.compose(aspectRatioFor, resolutionIn);

const getRect =
  U.lift(({ x, y, cx: width, cy: height }) =>
    <rect {...{ x: Math.round(x),
                y: Math.round(y),
                width: Math.round(width),
                height: Math.round(height) }} />)

const Scene: ComponentType<Props> = ({ scene, sceneAspect = getSceneAR(scene) }: Props) =>
  <article>
    <header>
      <h4>{nameIn(scene)}</h4>
    </header>

    {/* @todo Calculate aspect ratio properly */}
    <section className="Sources">
      <svg viewBox="0 0 1920 1200"
           style={{ width: '100%', height: '62.5%' }}>
        {U.seq(sourcesIn(scene),
               U.mapElems((el, i) =>
                 U.fromKefir(getRect(el))))}
        {/* {U.seq(sourcesIn(scene),
              U.mapElems((el, i) =>
                <div className="Source__item" style={{ height: U.string`${U.multiply(100, sceneAspect)}%` }}>
                  {nameIn(el)}
                </div>))} */}
      </svg>
    </section>
  </article>;

export default Scene;
