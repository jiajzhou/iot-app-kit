# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 2.1.0 (2022-09-30)

### Features

* react-components:
  * add VideoPlayer and RequestVideoUpload components ([f08c541](https://github.com/awslabs/iot-app-kit/commit/f08c541f017f4bbefae085e45c2ef2e686eb5919))
* scene-composer:
  * add SceneViewer component ([f08c541](https://github.com/awslabs/iot-app-kit/commit/f08c541f017f4bbefae085e45c2ef2e686eb5919))
* source-iottwinmaker:
  * add source-iottwinmaker module ([f08c541](https://github.com/awslabs/iot-app-kit/commit/f08c541f017f4bbefae085e45c2ef2e686eb5919))

### Bug Fixes

* components:
  * import missing CSS style sheets. ([f2450bc](https://github.com/awslabs/iot-app-kit/commit/f2450bc17906bff2ad4ac065eb26b36726d530d6))

### Documentation

* add SceneViewer, VideoPlayer and AWSIoTTwinMakerSource documentation and link to main ([f08c541](https://github.com/awslabs/iot-app-kit/commit/f08c541f017f4bbefae085e45c2ef2e686eb5919) & [71e59be](https://github.com/awslabs/iot-app-kit/commit/71e59be2ad0abcabb9136cf88c3c6c1d16606390))
* doc: update link in Coding Guidelines ([ea041cd](https://github.com/awslabs/iot-app-kit/commit/ea041cd8aadcb65b08c5bc09e6baf2958dbbdd35))

### Miscellaneous

* update react / react-dom versions from >=16 to ^17 ([f08c541](https://github.com/awslabs/iot-app-kit/commit/f08c541f017f4bbefae085e45c2ef2e686eb5919))
* update jest versions from 28 to 27 to be consistent with other modules ([f08c541](https://github.com/awslabs/iot-app-kit/commit/f08c541f017f4bbefae085e45c2ef2e686eb5919))

# 2.0.0 (2022-09-14)

### BREAKING CHANGES
* `@iot-app-kit/components/iot-table` now uses AWS-UI's table components (wrapped as a separated [table package](https://github.com/awslabs/iot-app-kit/blob/main/packages/table)) instead of Synchro-chart's table component.
  Because of this change, we have new APIs for `iot-table` component. Check this [documentation](https://github.com/awslabs/iot-app-kit/blob/main/docs/Table.md) for more information about new APIs and migration from old APIs.
* At current version (v2.0.0), `iot-table` does **NOT** support viewport groups. It will be added in a later version.

### Features
* introduce new table component supporting filtering and sorting. ([c75d4f0](https://github.com/awslabs/iot-app-kit/commit/c75d4f05b64c801c06ba45acd3b5df2fb7d2e30a))

### Miscellaneous
* bump synchro-charts/core version from v5 to v6 (#199) ([ad1e3e6](https://github.com/awslabs/iot-app-kit/commit/ad1e3e6108cc02d58060365ab4bad950f0e991cc))
* Migrate to NPM workspaces ([8e200be](https://github.com/awslabs/iot-app-kit/commit/8e200be0401fe6fa989cbf9a1ad96aafd8305a96))

# 1.5.0 (2022-07-09)


### Features

* synchro-charts version updated to 5.0.0

* Added properties to the following components:

IotBarChart:
* alarms
* axis
* gestures
* layout
* legend
* messageOverrides
* movement
* scale
* size
* trends

IotKpi:
* messageOverrides

IotLineChart:
* axis
* gestures
* layout
* legend
* messageOverrides
* movement
* scale
* size
* trends

IotScatterChart:
* alarms
* axis
* gestures
* layout
* legend
* messageOverrides
* movement
* scale
* size
* trends

IotStatusGrid:
* labelsConfig

IotStatusTimeline:
* alarms
* annotations
* axis
* gestures
* layout
* messageOverrides
* movement
* scale
* size

IotTable:
* messageOverrides
* trends

### Fixes

* integration tests asset model and asset summary mocks updated to return current response.




# 1.4.0 (2022-06-09)


### Features

* support auto-assigning colors for certain components ([8df4f15](https://github.com/awslabs/iot-app-kit/commit/8df4f150be4d8d1d8c3b55fe46ec91e6d9a7bb9a))
* bump synchro-charts to 4.0.1 ([977f461](https://github.com/awslabs/iot-app-kit/commit/977f461504292409cbde7e82166fa32ef0c9a93c))
* add expanded property to iot-resource-explorer ([dda6ef8](https://github.com/awslabs/iot-app-kit/commit/dda6ef8957617cfcb1c99d4bea06036a896c6aae))




## 1.3.0 (2022-04-29)
* update documentation ([a9154ef](https://github.com/awslabs/iot-app-kit/commit/b02ed4a48f1e4cdbf948ac482062df6b3c9d2ab7))
* automatically define components for the react-components library ([a9154ef](https://github.com/awslabs/iot-app-kit/commit/b02ed4a48f1e4cdbf948ac482062df6b3c9d2ab7))

## 1.2.1 (2022-03-11)


### Bug Fixes

* unsubrscribe data provider on component updates ([a9154ef](https://github.com/awslabs/iot-app-kit/commit/a9154eff3f3fcd55eb5ae501354de8530f706108))





# 1.2.0 (2022-03-03)


### Bug Fixes

* attach ResourceExplorer react component onSelectionChange prop ([#81](https://github.com/awslabs/iot-app-kit/issues/81))


### Features

* export table react component ([#81](https://github.com/awslabs/iot-app-kit/issues/81))





# 1.1.0 (2022-03-01)


### Features

* Export global styles. This will allow imports from @iot-app-kit/components/styles.css ([#72](https://github.com/awslabs/iot-app-kit/issues/72))





# 1.0.0 (2022-02-28)


### Bug Fixes

* mock SDK in component tests ([#56](https://github.com/awslabs/iot-app-kit/issues/56)) ([7b6f7da](https://github.com/awslabs/iot-app-kit/commit/7b6f7daeaa5c40b068bdd2f3ba684da066ef3386))
* related-table eslint and prettier ([#10](https://github.com/awslabs/iot-app-kit/issues/10)) ([a75e64a](https://github.com/awslabs/iot-app-kit/commit/a75e64aafdccfe8df37f72b9a087dc3b06cacb00))
* remove prettier, enforce eslint on build ([#29](https://github.com/awslabs/iot-app-kit/issues/29)) ([225afef](https://github.com/awslabs/iot-app-kit/commit/225afeffb8ac57b662e5b0fbaa4aeda515bd2c48))
* requestBuffer ([#49](https://github.com/awslabs/iot-app-kit/issues/49)) ([4702ad5](https://github.com/awslabs/iot-app-kit/commit/4702ad52794341d174ccf95a19589014ee8bbaee))
* sitewise source time series module ([#71](https://github.com/awslabs/iot-app-kit/issues/71)) ([998d59f](https://github.com/awslabs/iot-app-kit/commit/998d59f63fed1c97a9529f54928719e58fc00c5d))
* testing ground DataModule parameter ([#17](https://github.com/awslabs/iot-app-kit/issues/17)) ([b4fde90](https://github.com/awslabs/iot-app-kit/commit/b4fde9002f67057fc938b90841eed1b1b6a42fc1))


### Features

* Add Asset Hierarchy loading & Asset Tree support ([6adc67e](https://github.com/awslabs/iot-app-kit/commit/6adc67eeb70871ea866ef22ca3a6ee63fb1499e3))
* Add Core SiteWise Asset Module ([1287af8](https://github.com/awslabs/iot-app-kit/commit/1287af8652d8be3bd1471414b552ba246802790b))
* add in styles overrides and refId in query ([#38](https://github.com/awslabs/iot-app-kit/issues/38)) ([7b82989](https://github.com/awslabs/iot-app-kit/commit/7b82989e00b7385effa6ab29337e88352a9aed63))
* add npm-publish github workflow ([#68](https://github.com/awslabs/iot-app-kit/issues/68)) ([1d14361](https://github.com/awslabs/iot-app-kit/commit/1d14361b88e86ea44ad2d38409dd53c96f550fd3))
* Add proposed API changes within types declarations ([#37](https://github.com/awslabs/iot-app-kit/issues/37)) ([d165299](https://github.com/awslabs/iot-app-kit/commit/d1652990dff23cdc398374cd549a7c4ac9dfb711))
* add support for resolution mapping ([#16](https://github.com/awslabs/iot-app-kit/issues/16)) ([1dad2b6](https://github.com/awslabs/iot-app-kit/commit/1dad2b663a60ef939e48b58dae5d9c3f07bc68a4))
* add test runner github action ([#8](https://github.com/awslabs/iot-app-kit/issues/8)) ([5a468ff](https://github.com/awslabs/iot-app-kit/commit/5a468fffcb237bfbec6e0573c8df71e5a9ca3929))
* allow to specify region for data-module ([#4](https://github.com/awslabs/iot-app-kit/issues/4)) ([e49716f](https://github.com/awslabs/iot-app-kit/commit/e49716fb3a137ec139e1c236bf5eb29573dab8c9))
* api simplification of requestSettings ([#27](https://github.com/awslabs/iot-app-kit/issues/27)) ([3d6f458](https://github.com/awslabs/iot-app-kit/commit/3d6f458e8987a7c61b9b4d931426f33ef016a3bd))
* backfill component integration tests ([#66](https://github.com/awslabs/iot-app-kit/issues/66)) ([ac16b08](https://github.com/awslabs/iot-app-kit/commit/ac16b0807cdb86cbd700e38154bd7a563222560e))
* bind gestures to components ([#31](https://github.com/awslabs/iot-app-kit/issues/31)) ([c48e114](https://github.com/awslabs/iot-app-kit/commit/c48e114486e60784e32bc2ceb708525435ad0db8))
* create react-components and source-iotsitewise pkgs ([#57](https://github.com/awslabs/iot-app-kit/issues/57)) ([7b0f3cf](https://github.com/awslabs/iot-app-kit/commit/7b0f3cf443d89ff7f89f334d9c5abb7400ab084b))
* create tree table base component ([#15](https://github.com/awslabs/iot-app-kit/issues/15)) ([0e4412c](https://github.com/awslabs/iot-app-kit/commit/0e4412c7a3f73b2ffd56dbc7c44ee7afbc93b09f))
* customizable resolutions ([#23](https://github.com/awslabs/iot-app-kit/issues/23)) ([08129f1](https://github.com/awslabs/iot-app-kit/commit/08129f17ff9579123525f56735ae65e3602cb89e))
* error handling/data-module core ([#14](https://github.com/awslabs/iot-app-kit/issues/14)) ([cb85241](https://github.com/awslabs/iot-app-kit/commit/cb852416bc2fb941e119bea4f79cf7c12e39d099))
* explicitly type sitewise query ([#59](https://github.com/awslabs/iot-app-kit/issues/59)) ([96102b9](https://github.com/awslabs/iot-app-kit/commit/96102b94b4c799392b0c1620f6eaaf07bf6d4862))
* improve error handling ([#61](https://github.com/awslabs/iot-app-kit/issues/61)) ([183c01d](https://github.com/awslabs/iot-app-kit/commit/183c01d8f255c3e528aee79b58fbbc89f1567b31))
* introduce module coordinator ([#47](https://github.com/awslabs/iot-app-kit/issues/47)) ([3fb5076](https://github.com/awslabs/iot-app-kit/commit/3fb50764115d3f417e1ccf0320eb19e95c80759e))
* Onboard cypress with component test runner ([#34](https://github.com/awslabs/iot-app-kit/issues/34)) ([82479eb](https://github.com/awslabs/iot-app-kit/commit/82479eb4434344fbfd93c5d4773243b62edc1bc4))
* pass thru annotations ([#65](https://github.com/awslabs/iot-app-kit/issues/65)) ([22bca08](https://github.com/awslabs/iot-app-kit/commit/22bca08dea0cabef1e17931ee394dc54522fd7a8))
* query provider classes and TimeSeriesData support ([#51](https://github.com/awslabs/iot-app-kit/issues/51)) ([655e545](https://github.com/awslabs/iot-app-kit/commit/655e545b099ef7163a53d6fe71af9c980ce1ed64))
* refactor app kit ([#67](https://github.com/awslabs/iot-app-kit/issues/67)) ([ec1ba70](https://github.com/awslabs/iot-app-kit/commit/ec1ba7051e779f947d31aa8611e31d039f60b2be))
* Refactor Asset Tree to use the new Query/Provider system ([#62](https://github.com/awslabs/iot-app-kit/issues/62)) ([f21b230](https://github.com/awslabs/iot-app-kit/commit/f21b230cfe12bd51ebb29280ab8c20fedfaea7e8))
* Refactor Site Wise Asset session interface to support Promises ([#40](https://github.com/awslabs/iot-app-kit/issues/40)) ([d309262](https://github.com/awslabs/iot-app-kit/commit/d309262a97d38151a1352567a362b4abf2efd080))
* request data in descending order ([#30](https://github.com/awslabs/iot-app-kit/issues/30)) ([ffbbe19](https://github.com/awslabs/iot-app-kit/commit/ffbbe19a4842a179188487f38415bbc6b33ad49a))
* Resource Explorer ([#24](https://github.com/awslabs/iot-app-kit/issues/24)) ([2151f5e](https://github.com/awslabs/iot-app-kit/commit/2151f5e22516100404ac6ac7076ce27e25915e02))
* restructure mocks of sitewise to all be co-located ([#52](https://github.com/awslabs/iot-app-kit/issues/52)) ([5bafe89](https://github.com/awslabs/iot-app-kit/commit/5bafe89eb3122aa90c9fe25d8aac66658aa91551))
* sitewise components use query and provider ([#54](https://github.com/awslabs/iot-app-kit/issues/54)) ([dd24732](https://github.com/awslabs/iot-app-kit/commit/dd24732ea574441813c5af8e05773d8894732b4b))
* Sitewise Resource Explorer ([#21](https://github.com/awslabs/iot-app-kit/issues/21)) ([df030fa](https://github.com/awslabs/iot-app-kit/commit/df030fa33e5f7e86d4377adc0fc66753533ab88f))
* source-iotsitewise useable module ([#63](https://github.com/awslabs/iot-app-kit/issues/63)) ([9807c69](https://github.com/awslabs/iot-app-kit/commit/9807c69dae88933d43e67d5862526a87901e8810))
* Support multiple queries per subscription ([#39](https://github.com/awslabs/iot-app-kit/issues/39)) ([67b7afa](https://github.com/awslabs/iot-app-kit/commit/67b7afaca9d7979419e7ca80ce9f1dcc6294a346))
* update sitewise component interface ([#58](https://github.com/awslabs/iot-app-kit/issues/58)) ([afc672a](https://github.com/awslabs/iot-app-kit/commit/afc672a8e425f95eac28d7b14c16ce422a8f6abf))
