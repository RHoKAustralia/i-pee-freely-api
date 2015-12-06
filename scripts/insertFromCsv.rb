#!/usr/bin/ruby

require 'csv'

def isYes(val)
  return false if !val
  return val.downcase().include?("yes")
end

CSV.foreach("changingPlaces.csv") do |row|
  features = []
  methodOfAccess = ""
  slingRequired = false
  notes = ""
  openingHours = ""

  fakeLatLngInputString = "-1,4"

  address = "#{row[4]}, #{row[5]}, #{row[6]}, #{row[3]}"
  features.push("Height adjustable adult-sized change table") if isYes(row[7])
  features.push("Electric ceiling hoist") if isYes(row[8])
  features.push("Shower") if isYes(row[9])
  if isYes(row[13])
    methodOfAccess = "MLAK key to use these facilities"
  else
    methodOfAccess = "No key required"
  end

  slingRequired = isYes(row[14])

  otherInformation = features.join(", ")
  name = row[4]

  latLngComponents = row[15].split(",")
  locationLatLng = "POINT(#{latLngComponents[0]},#{latLngComponents[1]})"

  locationType = "Adult Changing Facility"

  if isYes(row[10])
    locationType = "Fully Accredited Changing Place"
  end

  puts "INSERT INTO location (address,locationLatLng,methodsOfAccess,name,notes,openingHours,otherInformation,locationType) " +
  " VALUES ('#{address}',#{locationLatLng},'#{methodOfAccess}','#{name}','#{notes}','#{openingHours}','#{otherInformation}', '#{locationType}');"

end