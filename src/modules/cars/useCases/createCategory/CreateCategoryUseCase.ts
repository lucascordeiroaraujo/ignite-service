import { inject, injectable } from 'tsyringe'

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadExists = await this.categoryRepository.findByName(name)

    if (categoryAlreadExists) {
      throw new Error('Category already exists')
    }

    this.categoryRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase }
