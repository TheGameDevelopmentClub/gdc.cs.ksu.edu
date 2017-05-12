<?php

use Illuminate\Database\Seeder;

class OfficerTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('officers')->insert([
        'position'=>'President',
        'name' => '',
        'email' => '',
        'created_at'=> new DateTime,
        'updated_at'=> new DateTime
      ]);
      DB::table('officers')->insert([
        'position'=>'Vice President',
        'name' => '',
        'email' => '',
        'created_at'=> new DateTime,
        'updated_at'=> new DateTime
      ]);
      DB::table('officers')->insert([
        'position'=>'Treasurer',
        'name'=>'',
        'email'=>'',
        'created_at'=> new DateTime,
        'updated_at'=> new DateTime
      ]);
      DB::table('officers')->insert([
        'position'=>'Event Manager',
        'name'=>'',
        'email'=>'',
        'created_at'=> new DateTime,
        'updated_at'=> new DateTime
      ]);
      DB::table('officers')->insert([
        'position'=>'Industry Liaison',
        'name'=>'',
        'email'=>'',
        'created_at'=> new DateTime,
        'updated_at'=> new DateTime
      ]);
      DB::table('officers')->insert([
        'position'=>'Website Manager',
        'name'=>'',
        'email'=>'',
        'created_at'=> new DateTime,
        'updated_at'=> new DateTime
      ]);
      DB::table('officers')->insert([
        'position'=>'Social Media Manager',
        'name'=>'',
        'email'=>'',
        'created_at'=> new DateTime,
        'updated_at'=> new DateTime
      ]);
    }
}
