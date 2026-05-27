// src/cars/cars.service.ts
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from './schemas/car.schema';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { FilterCarDto } from './dto/filter-car.dto';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  // ─── Create ───────────────────────────────────────────────────
  async create(createCarDto: CreateCarDto): Promise<Car> {
    const car = new this.carModel(createCarDto);
    return car.save();
  }

  // ─── Find All (with filters) ──────────────────────────────────
  async findAll(filterDto: FilterCarDto) {
    const {
      brand,
      model,
      type,
      condition,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      fuelType,
      transmission,
      isFeatured,
      isLuxury,
      isAvailable,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 12,
    } = filterDto;

    const query: any = {};

    if (brand && brand !== 'All Brands') query.brand = new RegExp(brand, 'i');
    if (model) query.model = new RegExp(model, 'i');
    if (type && type !== 'All Types') query.type = new RegExp(type, 'i');
    if (condition) query.condition = condition;
    if (fuelType) query.fuelType = fuelType;
    if (transmission) query.transmission = transmission;
    if (typeof isFeatured === 'boolean') query.isFeatured = isFeatured;
    if (typeof isLuxury === 'boolean') query.isLuxury = isLuxury;
    if (typeof isAvailable === 'boolean') query.isAvailable = isAvailable;

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = minPrice;
      if (maxPrice !== undefined) query.price.$lte = maxPrice;
    }

    if (minYear !== undefined || maxYear !== undefined) {
      query.year = {};
      if (minYear !== undefined) query.year.$gte = minYear;
      if (maxYear !== undefined) query.year.$lte = maxYear;
    }

    if (search) {
      query.$or = [
        { brand: new RegExp(search, 'i') },
        { model: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { type: new RegExp(search, 'i') },
      ];
    }

    const sortOptions: any = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    const [cars, total] = await Promise.all([
      this.carModel
        .find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.carModel.countDocuments(query),
    ]);

    return {
      cars,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // ─── Find Featured ────────────────────────────────────────────
  async findFeatured(): Promise<Car[]> {
    return this.carModel
      .find({ isFeatured: true, isAvailable: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .exec();
  }

  // ─── Find Luxury ──────────────────────────────────────────────
  async findLuxury(): Promise<Car[]> {
    return this.carModel
      .find({ isLuxury: true, isAvailable: true })
      .sort({ price: -1 })
      .limit(8)
      .exec();
  }

  // ─── Find One ─────────────────────────────────────────────────
  async findOne(id: string): Promise<Car> {
    const car = await this.carModel.findById(id).exec();
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    // Increment views
    await this.carModel.findByIdAndUpdate(id, { $inc: { views: 1 } });
    return car;
  }

  // ─── Update ───────────────────────────────────────────────────
  async update(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.carModel
      .findByIdAndUpdate(id, updateCarDto, { new: true })
      .exec();
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    return car;
  }

  // ─── Delete ───────────────────────────────────────────────────
  async remove(id: string): Promise<void> {
    const result = await this.carModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
  }

  // ─── Mark as Sold ─────────────────────────────────────────────
  async markAsSold(id: string) {
    const car = await this.carModel.findByIdAndUpdate(
      id,
      {
        isSold: true,
        soldAt: new Date(),
      },
      { new: true },
    );
    if (!car) throw new NotFoundException('Car not found');
    return { message: 'Car marked as sold', car };
  }

  // ─── Mark as Available ────────────────────────────────────────
  async markAsAvailable(id: string) {
    const car = await this.carModel.findByIdAndUpdate(
      id,
      {
        isSold: false,
        soldAt: null,
      },
      { new: true },
    );
    if (!car) throw new NotFoundException('Car not found');
    return { message: 'Car marked as available', car };
  }

  // ─── Get Brands ───────────────────────────────────────────────
  async getBrands(): Promise<string[]> {
    return this.carModel.distinct('brand').exec();
  }

  // ─── Get Types ────────────────────────────────────────────────
  async getTypes(): Promise<string[]> {
    return this.carModel.distinct('type').exec();
  }

  // ─── Get Stats ────────────────────────────────────────────────
  async getStats() {
    const total = await this.carModel.countDocuments();
    const available = await this.carModel.countDocuments({ isAvailable: true });
    const featured = await this.carModel.countDocuments({ isFeatured: true });
    const luxury = await this.carModel.countDocuments({ isLuxury: true });
    const sold = await this.carModel.countDocuments({ isSold: true }); // ← NEW
    const brands = await this.carModel.distinct('brand');

    return {
      total,
      available,
      featured,
      luxury,
      sold,
      totalBrands: brands.length,
    };
  }

  // ─── Seed Cars ────────────────────────────────────────────────
  async seedCars(): Promise<void> {
    const count = await this.carModel.countDocuments();
    if (count > 0) return;

    const cars = [
      {
        brand: 'BMW',
        model: '7 Series',
        year: 2023,
        price: 15500000,
        originalPrice: 17000000,
        type: 'Sedan',
        condition: 'New',
        mileage: 0,
        engine: '3.0L Inline-6 Turbo',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        color: 'Alpine White',
        interiorColor: 'Black Merino Leather',
        seats: 5,
        doors: 4,
        features: [
          'Sunroof',
          'Navigation',
          'Heated Seats',
          'Parking Sensors',
          'Blind Spot Detection',
          'Lane Departure Warning',
          'Adaptive Cruise Control',
        ],
        images: [
          'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
          'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800',
        ],
        description:
          'Experience ultimate luxury with the BMW 7 Series. This masterpiece combines cutting-edge technology with unparalleled comfort.',
        isAvailable: true,
        isFeatured: true,
        isLuxury: true,
        isSold: false,
        location: 'Nairobi, Kenya',
      },
      {
        brand: 'Mercedes-Benz',
        model: 'S-Class',
        year: 2023,
        price: 18500000,
        originalPrice: 20000000,
        type: 'Sedan',
        condition: 'New',
        mileage: 0,
        engine: '4.0L V8 Biturbo',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        color: 'Obsidian Black Metallic',
        interiorColor: 'Nappa Leather Macchiato Beige',
        seats: 5,
        doors: 4,
        features: [
          'MBUX Infotainment',
          'Air Suspension',
          'Burmester Sound',
          'Night Vision',
          'Massage Seats',
          'Ambient Lighting',
          'Head-up Display',
        ],
        images: [
          'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
          'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800',
        ],
        description:
          'The Mercedes-Benz S-Class sets the standard for luxury sedans worldwide. Pure opulence in motion.',
        isAvailable: true,
        isFeatured: true,
        isLuxury: true,
        isSold: false,
        location: 'Nairobi, Kenya',
      },
      {
        brand: 'Range Rover',
        model: 'Sport',
        year: 2022,
        price: 16800000,
        originalPrice: 18500000,
        type: 'SUV',
        condition: 'Used',
        mileage: 15000,
        engine: '5.0L V8 Supercharged',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        color: 'Santorini Black',
        interiorColor: 'Ebony Windsor Leather',
        seats: 7,
        doors: 5,
        features: [
          'Terrain Response 2',
          'Air Suspension',
          'Pivi Pro Infotainment',
          'Meridian Sound',
          'Heated/Cooled Seats',
          'Panoramic Roof',
          'Wade Sensing',
        ],
        images: [
          'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
          'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
        ],
        description:
          'The Range Rover Sport combines breathtaking performance with exceptional luxury.',
        isAvailable: true,
        isFeatured: true,
        isLuxury: true,
        isSold: false,
        location: 'Karatina, Kenya',
      },
      {
        brand: 'Porsche',
        model: 'Cayenne',
        year: 2023,
        price: 19500000,
        type: 'SUV',
        condition: 'New',
        mileage: 0,
        engine: '3.0L V6 Turbo',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        color: 'Carrara White Metallic',
        interiorColor: 'Black Leather',
        seats: 5,
        doors: 5,
        features: [
          'Sport Chrono Package',
          'PASM Air Suspension',
          'Bose Sound',
          'Night Vision',
          'Surround View',
          'Active Cruise Control',
          '4-Zone Climate',
        ],
        images: [
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
          'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
        ],
        description:
          'The Porsche Cayenne – where sports car performance meets SUV versatility.',
        isAvailable: true,
        isFeatured: true,
        isLuxury: true,
        isSold: false,
        location: 'Nairobi, Kenya',
      },
      {
        brand: 'Audi',
        model: 'A8',
        year: 2022,
        price: 14500000,
        originalPrice: 16000000,
        type: 'Sedan',
        condition: 'Used',
        mileage: 22000,
        engine: '3.0L V6 TFSI',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        color: 'Florett Silver Metallic',
        interiorColor: 'Valcona Leather',
        seats: 5,
        doors: 4,
        features: [
          'MMI Navigation Plus',
          'Bang & Olufsen Sound',
          'Massage Seats',
          'Predictive Active Suspension',
          'Night Vision',
          'HD Matrix LED',
          'Audi Phone Box',
        ],
        images: [
          'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800',
          'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800',
        ],
        description:
          'Audi A8 – the pinnacle of German engineering. Sophisticated technology meets refined luxury.',
        isAvailable: true,
        isFeatured: false,
        isLuxury: true,
        isSold: false,
        location: 'Mombasa, Kenya',
      },
      {
        brand: 'Lamborghini',
        model: 'Urus',
        year: 2022,
        price: 45000000,
        type: 'SUV',
        condition: 'Used',
        mileage: 8000,
        engine: '4.0L V8 Twin-Turbo',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        color: 'Arancio Borealis Orange',
        interiorColor: 'Black Alcantara',
        seats: 5,
        doors: 5,
        features: [
          'ANIMA Drive Mode Selector',
          'Active Road Noise Cancellation',
          'Lamborghini Doppio Schermo',
          'Rear Seat Entertainment',
          'Carbon Fiber Interior',
          'Advanced Driver Assistance',
        ],
        images: [
          'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
        ],
        description:
          "The Lamborghini Urus – the world's first Super Sport Utility Vehicle.",
        isAvailable: true,
        isFeatured: true,
        isLuxury: true,
        isSold: false,
        location: 'Nairobi, Kenya',
      },
      {
        brand: 'Ferrari',
        model: 'GTC4Lusso',
        year: 2021,
        price: 65000000,
        type: 'Coupe',
        condition: 'Used',
        mileage: 5000,
        engine: '6.3L V12',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        color: 'Rosso Corsa Red',
        interiorColor: 'Beige Leather',
        seats: 4,
        doors: 2,
        features: [
          'V12 Engine',
          'Carbon Fiber Body',
          'Ferrari Dynamic Enhancer',
          'Side Slip Control',
          'Brembo Brakes',
          'Scuderia Ferrari Shields',
        ],
        images: [
          'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
          'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800',
        ],
        description:
          'Ferrari GTC4Lusso – where passion meets performance.',
        isAvailable: true,
        isFeatured: true,
        isLuxury: true,
        isSold: false,
        location: 'Nairobi, Kenya',
      },
      {
        brand: 'Bentley',
        model: 'Continental GT',
        year: 2022,
        price: 55000000,
        type: 'Coupe',
        condition: 'Used',
        mileage: 12000,
        engine: '6.0L W12 TSI',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        color: 'Beluga Black',
        interiorColor: 'Linen & Imperial Blue Leather',
        seats: 4,
        doors: 2,
        features: [
          'W12 Engine',
          'Rotating Dashboard Display',
          'Naim Audio',
          'Massage Seats',
          'Diamond Quilted Leather',
          'Bentley Dynamic Ride',
          'Night Vision',
        ],
        images: [
          'https://images.unsplash.com/photo-1621135353758-a5e7bc57c57a?w=800',
          'https://images.unsplash.com/photo-1562141961-b8df5eedbb66?w=800',
        ],
        description:
          'Bentley Continental GT – the grand tourer that defines British luxury.',
        isAvailable: true,
        isFeatured: false,
        isLuxury: true,
        isSold: false,
        location: 'Nairobi, Kenya',
      },
    ];

    await this.carModel.insertMany(cars);
    console.log('✅ Sample cars seeded successfully');
  }
}