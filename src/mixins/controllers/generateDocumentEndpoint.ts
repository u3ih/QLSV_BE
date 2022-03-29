import {BaseControllerMixinOptions} from "./base-controller-mixin";

export const generateDocumentEndpoint = (options: BaseControllerMixinOptions) => {
  return options.basePath || `${options.modelClass.modelName.toLowerCase()}s`
}
